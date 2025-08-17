require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');
const MapugkaCharacter = require('./character');

// Ініціалізація бота та сервера
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const app = express();

// Зберігання стану користувачів (тимчасове, в пам'яті)
const userCharacters = new Map();

// Отримати персонажа користувача
function getUserCharacter(userId) {
  if (!userCharacters.has(userId)) {
    userCharacters.set(userId, new MapugkaCharacter());
  }
  return userCharacters.get(userId);
}

// Базова команда /start
bot.start((ctx) => {
  const character = getUserCharacter(ctx.from.id);
  ctx.reply('Ласкаво просимо до MAPUGKA Meme Factory & Charm Collection!');
});

// Команда для перегляду персонажа
bot.command('mymapugka', (ctx) => {
  const character = getUserCharacter(ctx.from.id);
  const state = character.getState();
  
  let accessories = state.accessories.length > 0 
    ? `Аксесуари: ${state.accessories.join(', ')}`
    : 'Ще немає аксесуарів';
    
  ctx.replyWithHTML(`
🎀 Ваш MAPUGKA 🎀
Рівень шарму: ${state.charmLevel}
Стейкано токенів: ${state.stakedTokens} $MAPUGKA
${accessories}
  `);
});

// Команда для стейкінгу токенів
bot.command('stake', (ctx) => {
  const amount = parseInt(ctx.message.text.split(' ')[1]) || 0;
  
  if (amount <= 0) {
    return ctx.reply('Будь ласка, вкажіть додатню кількість токенів для стейкінгу');
  }
  
  const character = getUserCharacter(ctx.from.id);
  const newBalance = character.stakeTokens(amount);
  
  ctx.reply(`✅ Ви успішно застейкали ${amount} $MAPUGKA!\nЗагальний стейк: ${newBalance} $MAPUGKA`);
});

// Роут для кореневого шляху
app.get('/', (req, res) => {
  res.send('MAPUGKA Meme Factory & Charm Collection is running!');
});

// Налаштування вебхука
app.use(express.json());
app.post(`/webhook`, (req, res) => {
  bot.handleUpdate(req.body, res);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
  try {
    bot.launch();
    console.log('Telegram бот активовано');
  } catch (error) {
    console.error('Помилка активації бота:', error.message);
  }
});

// Обробка непередбачених помилок
process.on('uncaughtException', (error) => {
  console.error('Непередбачена помилка:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Необроблена відмова:', reason);
});
