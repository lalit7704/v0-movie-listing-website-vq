const TelegramBot = require("node-telegram-bot-api");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

try {
  process.loadEnvFile(path.join(__dirname, ".env.local"));
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }
}

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is required");
}
const STORAGE_CHANNEL_ID = -1003845134502;
const MEMBERSHIP_CHANNEL_ID = -1003845134502;
const CHANNEL_JOIN_URL = "https://t.me/onemoviedownloa";
const OWNER_USER_ID = 990444100;
const STATS_FILE = path.join(__dirname, "bot-stats.json");
const SUPPORT_COOLDOWN_MS = 60 * 1000;
const supportCooldowns = new Map();

const bot = new TelegramBot(token, { polling: true });

function emptyStats() {
  return {
    totals: {
      starts: 0,
      requests: 0,
      deliveries: 0,
      contentRequests: 0,
      reports: 0,
    },
    users: {},
    days: {},
  };
}

function readStats() {
  try {
    return JSON.parse(fs.readFileSync(STATS_FILE, "utf8"));
  } catch {
    return emptyStats();
  }
}

function todayInIndia() {
  return new Date(Date.now() + 330 * 60 * 1000).toISOString().slice(0, 10);
}

function recordEvent(userId, event) {
  try {
    const stats = readStats();
    const userKey = crypto
      .createHash("sha256")
      .update(String(userId))
      .digest("hex")
      .slice(0, 16);
    const today = todayInIndia();

    stats.totals[event] = (stats.totals[event] || 0) + 1;
    stats.users[userKey] = true;
    stats.days[today] ||= {
      starts: 0,
      requests: 0,
      deliveries: 0,
      contentRequests: 0,
      reports: 0,
      users: {},
    };
    stats.days[today][event] = (stats.days[today][event] || 0) + 1;
    stats.days[today].users[userKey] = true;

    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  } catch (error) {
    console.error("Could not save bot stats:", error.message);
  }
}

function statsMessage() {
  const stats = readStats();
  const today = todayInIndia();
  const daily = stats.days[today] || {
    starts: 0,
    requests: 0,
    deliveries: 0,
    contentRequests: 0,
    reports: 0,
    users: {},
  };

  return [
    "OneMovie Bot Stats",
    "",
    `Total unique users: ${Object.keys(stats.users).length}`,
    `Total bot starts: ${stats.totals.starts}`,
    `Total movie requests: ${stats.totals.requests}`,
    `Successful deliveries: ${stats.totals.deliveries}`,
    `Movie title requests: ${stats.totals.contentRequests || 0}`,
    `Broken link reports: ${stats.totals.reports || 0}`,
    "",
    `Today (${today})`,
    `Unique users: ${Object.keys(daily.users).length}`,
    `Bot starts: ${daily.starts}`,
    `Movie requests: ${daily.requests}`,
    `Successful deliveries: ${daily.deliveries}`,
    `Movie title requests: ${daily.contentRequests || 0}`,
    `Broken link reports: ${daily.reports || 0}`,
  ].join("\n");
}

function userLabel(user) {
  return user.username ? `@${user.username}` : `${user.first_name || "User"} (${user.id})`;
}

function canSubmitSupportRequest(userId, type) {
  const key = `${type}:${userId}`;
  const now = Date.now();
  const lastSubmittedAt = supportCooldowns.get(key) || 0;

  if (now - lastSubmittedAt < SUPPORT_COOLDOWN_MS) {
    return false;
  }

  supportCooldowns.set(key, now);
  return true;
}

function hasChannelAccess(member) {
  return (
    member.status === "creator" ||
    member.status === "administrator" ||
    member.status === "member" ||
    (member.status === "restricted" && member.is_member)
  );
}

async function showMovieAccess(chatId, userId, messageId) {
  try {
    const member = await bot.getChatMember(MEMBERSHIP_CHANNEL_ID, userId);

    if (hasChannelAccess(member)) {
      await bot.sendMessage(chatId, "Channel membership verified. Sending your movie...");
      const result = await bot.copyMessage(chatId, STORAGE_CHANNEL_ID, Number(messageId));
      recordEvent(userId, "deliveries");
      return result;
    }

    return bot.sendMessage(chatId, "Please join the channel to access this movie.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Join Channel", url: CHANNEL_JOIN_URL }],
          [{ text: "Check Again", callback_data: `check_m_${messageId}` }],
        ],
      },
    });
  } catch (error) {
    console.error("Membership check failed:", error.message);
    return bot.sendMessage(chatId, "Could not verify membership. Please try again.");
  }
}

bot.onText(/^\/start m_(\d+)$/, async (msg, match) => {
  recordEvent(msg.from.id, "requests");
  await showMovieAccess(msg.chat.id, msg.from.id, match[1]);
});

bot.onText(/^\/start$/, (msg) => {
  recordEvent(msg.from.id, "starts");
  bot.sendMessage(msg.chat.id, "Welcome to OneMovie Bot. Open a movie from the website.");
});

bot.onText(/^\/start request$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Send the movie name in this format:\n/request Movie Name",
  );
});

bot.onText(/^\/request\s+(.{2,100})$/i, async (msg, match) => {
  if (!canSubmitSupportRequest(msg.from.id, "request")) {
    return bot.sendMessage(msg.chat.id, "Please wait one minute before sending another request.");
  }

  const movieName = match[1].trim();
  await bot.sendMessage(
    OWNER_USER_ID,
    `New movie request\nMovie: ${movieName}\nFrom: ${userLabel(msg.from)}`,
  );
  recordEvent(msg.from.id, "contentRequests");
  return bot.sendMessage(msg.chat.id, `Request received: ${movieName}`);
});

bot.onText(/^\/start report_([A-Za-z0-9_-]+)$/, async (msg, match) => {
  if (!canSubmitSupportRequest(msg.from.id, "report")) {
    return bot.sendMessage(msg.chat.id, "Please wait one minute before sending another report.");
  }

  const movieId = match[1];
  await bot.sendMessage(
    OWNER_USER_ID,
    `Broken link report\nMovie ID: ${movieId}\nFrom: ${userLabel(msg.from)}`,
  );
  recordEvent(msg.from.id, "reports");
  return bot.sendMessage(msg.chat.id, "Thanks. The broken link report has been sent.");
});

bot.onText(/^\/stats$/, (msg) => {
  if (msg.from.id !== OWNER_USER_ID) {
    return;
  }

  bot.sendMessage(msg.chat.id, statsMessage());
});

bot.on("callback_query", async (query) => {
  const match = query.data && query.data.match(/^check_m_(\d+)$/);

  if (!match || !query.message) {
    return;
  }

  await bot.answerCallbackQuery(query.id, { text: "Checking membership..." });
  await showMovieAccess(query.message.chat.id, query.from.id, match[1]);
});

bot.on("polling_error", (error) => {
  console.error("Telegram polling error:", error.message);
});

console.log("OneMovie membership bot is running.");
