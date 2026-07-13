const TelegramBot = require("node-telegram-bot-api");

const token =
  process.env.TELEGRAM_BOT_TOKEN ||
  "8786488490:AAFm-5zyvCnu2LCmOvfoHWw_Nn2OsDXKMYI";
const STORAGE_CHANNEL_ID = -1003845134502;
const MEMBERSHIP_CHANNEL_ID = -1003845134502;
const CHANNEL_JOIN_URL = "https://t.me/onemoviedownloa";

const bot = new TelegramBot(token, { polling: true });

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
      return bot.copyMessage(chatId, STORAGE_CHANNEL_ID, Number(messageId));
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
  await showMovieAccess(msg.chat.id, msg.from.id, match[1]);
});

bot.onText(/^\/start$/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to OneMovie Bot. Open a movie from the website.");
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
