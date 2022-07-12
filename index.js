const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const text = require("./const");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.replyWithHTML(
    `Привет ${
      ctx.message.from.first_name ? `${ctx.message.from.first_name}!` : ","
    }\nМеня зовут Бот Retail\n\nЯ помогу тебе подобрать одежду в нашем уникальном магазине)\n\nДля этого тебе нужно лишь перейти в каталог и выбрать интересующий тебя товар.\nЕсли возникнут вопросы, то можешь <a href="tg://resolve?domain=retail_manager">связаться с нашим менеджером</a>, он тебе поможет)`,
    {
      reply_markup: {
        keyboard: [[{ text: "Каталог", web_app: { url: process.env.WEBAPP_LINK } }]],
      },
    }
  )
);
bot.help((ctx) => ctx.reply(text.commands));


function connectWithManager() {
  bot.action("btn_5", async (ctx) => {
    try {
      await ctx.answerCbQuery();
      await ctx.reply("Welcome", {
        reply_markup: {
          keyboard: [[{ text: "Каталог", web_app: { url: web_link } }]],
        },
      });
    } catch (e) {
      console.error(e);
    }
  });
}

connectWithManager();

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
