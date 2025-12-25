require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TG_TOKEN);
const chatId = process.env.TG_CHAT_ID;

bot.start(ctx => ctx.reply('TechVerseHub Bot\n/products /orders /upload'));
bot.command('products', ctx => ctx.reply('📦 USB-C Cable 12€\n📦 LED Strip 25€')));
bot.command('orders', ctx => ctx.reply('📋 #1 37€ paid'));
bot.on('photo', async ctx => {
  const link = await ctx.telegram.getFileLink(ctx.message.photo.pop().file_id);
  ctx.reply('✅ Banner hochgeladen: ' + link.href);
});
module.exports = bot;
