const { Telegraf } = require("telegraf");
const  axios  =  require("axios");

const bot = new Telegraf("5335519040:AAGAaNRLP1kLNSRfprqYf01m0HjUns3Krx4");


bot.start((context) => context.reply("Sup"));
bot.help((context) => context.reply("I exist for ed purposes"));
bot.hears("/hello", (context) => {
    context.reply("Hello, " + context.from.first_name + ". How are you doing?")
})

bot.hears("/fact", (context) => {
    axios
    .get("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(res => {
        context.reply(res.data.text)
    })
    .catch(err => console.log(err))
});

bot.hears("ugg", (context) => context.reply("brrrrr"));

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

//acios code for random fact function
// axios
//     .get("https://uselessfacts.jsph.pl/random.json?language=en")
//     .then(res => {
//         console.log(res.status)
//         context.reply(res.data.text)
//     })
//     .catch(err => console.log(err))