# MAPUGKA's Meme Factory & Charm Collection

Цей Telegram міні-додаток дозволяє:
- Керувати персонажем MAPUGKA
- Створювати меми
- Збирати аксесуари
- Змагатися у щоденних конкурсах

## Як розгорнути на Vercel

1. Завантажте код на GitHub репозиторій
2. Увійдіть у Vercel та створіть новий проект
3. Імпортуйте репозиторій
4. Додайте змінні середовища:
   - `TELEGRAM_BOT_TOKEN` - токен вашого Telegram бота
5. Налаштуйте вебхук для бота командою:
   ```bash
   curl -F "url=https://ВАШ_ДОМЕН.vercel.app/webhook" \
   https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook
   ```

## Команди бота
- `/start` - Початок роботи
- `/mymapugka` - Перегляд персонажа
- `/stake [кількість]` - Стейкінг токенів
