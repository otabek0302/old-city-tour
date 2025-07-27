# Telegram Bot Setup for Contact Form

## Overview
The contact form now sends submissions directly to a Telegram channel via a Telegram bot. This provides instant notifications when someone submits the contact form.

## Setup Instructions

### 1. Create a Telegram Bot
1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Save the bot token (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Get Chat ID
1. Add your bot to the channel/group where you want to receive notifications
2. Make the bot an admin of the channel
3. Send a message to the channel
4. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
5. Find the `chat_id` in the response (for channels, it will be negative like `-1001234567890`)

### 3. Environment Variables
Add these to your `.env.local` file:

```env
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_chat_id_here
```

### 4. Test the Integration
1. Fill out the contact form on your website
2. Submit the form
3. Check your Telegram channel for the notification

## Message Format
The bot sends formatted messages with:
- 👤 Name
- 📧 Email
- 📞 Phone (if provided)
- 📝 Subject
- 💬 Message
- ⏰ Timestamp

## Security Notes
- The bot token is exposed in the frontend (NEXT_PUBLIC_ prefix)
- For production, consider using a server-side API route to handle the Telegram API calls
- The bot should only have permission to send messages to your channel

## Troubleshooting
- If messages aren't received, check that the bot is an admin of the channel
- Verify the chat_id is correct (should be negative for channels)
- Check the browser console for any API errors 