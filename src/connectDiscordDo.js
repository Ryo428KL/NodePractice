// https://www.dice-programming-etc.com/javascriptdiscord-botdiscord-js/
const Discord = require('discord.js');
const SHEET = require('./googleSheet.js');
require('dotenv').config();
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'おい') {
    msg.reply('おい');
  }
  if (msg.content === 'hi!') {
    msg.reply('hi!');
  }
  if (msg.content === '次いつ') {
    SHEET.getSchedule().then((value => {
        msg.reply(value);
    }));
  }
  if (msg.content === 'よろしくお願いいたします！') {
    msg.reply('参加しました！よろしくお願いいたします！');
  }
  if(msg.content === '今週の予定'){
    SHEET.getScheduleWeekly().then((value => {
        for(let step = 0; step < value.length; step ++){
            msg.reply(value[step]);
        }
    }));
  }
});

client.login(process.env.DISCORD_TOKEN);