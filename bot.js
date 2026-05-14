

const TelegramBot = require("node-telegram-bot-api");

const token = "8786488490:AAHPs3nj54b2tk4jAzusYf0kgMydrgdtd74";

const bot = new TelegramBot(token, {
  polling: true,
});

const movies = [
  {
    id: "5008",
    title: "Vaazha Movie",
    slug: "vaazha-biopic-of-a-billion-boys-2025-youth-comedy-drama-full-movie-hd",
    downloadUrl: "https://t.me/onemoviedownloa/75",
    poster: "https://cdn.shopify.com/...",
    rating: 8,
    duration: "2h 22m",
  },
];


// 👇 YE YAHAN ADD KARO
bot.onText(/\/start$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome to OneMovie Bot 🎬\nPlease open movie from website."
  );
});


// 👇 Iske neeche already wala code rahega
bot.onText(/\/start (.+)/, async (msg, match) => {

  const chatId = msg.chat.id;

  const slug = match[1];

  const movie = movies.find(
    (m) => m.slug === slug
  );

  if (!movie) {
    return bot.sendMessage(
      chatId,
      "Movie not found"
    );
  }

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

});

console.log("Bot Running...");