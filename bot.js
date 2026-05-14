const TelegramBot = require("node-telegram-bot-api");

const token = "8786488490:AAFm-5zyvCnu2LCmOvfoHWw_Nn2OsDXKMYI";

const bot = new TelegramBot(token, {
  polling: true,
});

// Aapki website ka base URL. (Local pe testing ke liye localhost rakhein)
// Jab website live deploy ho jaye, toh isko "https://onemovie.in" se replace kar dein.
const WEBSITE_URL = "https://onemovie.in";

// Normal /start
bot.onText(/\/start$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome to OneMovie Bot 🎬\nPlease open movie from website."
  );
});

// Website se aane wala slug
bot.onText(/\/start (.+)/, async (msg, match) => {

  const chatId = msg.chat.id;

  const slug = match[1].trim(); // Extra space hata dega

  // slug hota hai video.id (website se)
  // website pe yahi data static arrays se serve hota hai, /api/movie wala endpoint is repo me nahi hai.
  // isliye Telegram bot ko fallback karna hoga: direct movie page ka url /movie/<slug> dena.
  // (DownloadUrl ke bajay Telegram inline button movie page open karwaega)
  const moviePageUrl = `${WEBSITE_URL}/movie/${slug}`;

  console.log("Received slug:", slug);

  try {
    // API ko call karke current slug ke basis pe live data nikalna
    const response = await fetch(`${WEBSITE_URL}/api/movie/${slug}`);

    // Agar response HTML (error page) aaye, toh usko handle karna
    const contentType = response.headers.get("content-type");

    // API available na ho (HTML / 404 / non-json) => fallback
    if (!contentType || !contentType.includes("application/json")) {
      // fallback: movie page link
      return bot.sendMessage(
        chatId,
        `Movie page: ${moviePageUrl}`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "📥 Open Download",
                  url: moviePageUrl,
                },
              ],
            ],
          },
        }
      );
    }

    const data = await response.json();


    console.log("API Response:", data); // Check karne ke liye ki API kya bhej rahi hai

    if (!data.success || !data.movie) {
      return bot.sendMessage(chatId, "Movie not found");
    }

    const movie = data.movie;

    await bot.sendPhoto(
      chatId,
      movie.poster,
      {
        caption: `
🎬 ${movie.title}

⭐ Rating: ${movie.rating}
🕒 Duration: ${movie.duration}
        `,
      }
    );

    await bot.sendMessage(
      chatId,
      "👇 Download Movie",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "📥 Download Now",
                url: movie.downloadUrl,
              },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error("Error fetching movie:", error);
    bot.sendMessage(chatId, "An error occurred while fetching the movie. Please try again.");
  }
});

console.log("Bot Running...");