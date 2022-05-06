const axios = require("axios")

const api_key = "5335519040:AAGAaNRLP1kLNSRfprqYf01m0HjUns3Krx4"

function getUpdates() {
    return axios
        .get(`https://api.telegram.org/bot${api_key}/getUpdates`)
        .then(response => {
            return response.data
        })
}

function checkForMessage(message) {
    let updateResults = updates.result;

    // updateResults.forEach(resultObject => {
    //     if (resultObject.message.text == message) {
    //         console.log(`The persons id is  ${resultObject.message.from.id}`)
    //         console.log(`The person's first name is ${resultObject.message.from.first_name}`)
    //         console.log(resultObject.message.text)

    //         return resultObject.message.from.id
    //     }
        
    // })

    
    let filteredUpdates = updateResults.filter(resultObject => resultObject.message.text == message)
    let filteredChatIds = filteredUpdates.map(resultObject => resultObject.message.from.id)

    console.log(filteredChatIds)

    return filteredChatIds
}

function sendMessage(chat_id, message){
    axios
        .get(`https://api.telegram.org/bot${api_key}/sendMessage?chat_id=${chat_id}&text=${message}`)
        .then(response => {
            console.log(response.status)
        })
        .catch(err => console.log(err))
}

function createCommandHandler(command, botResponse){
    let chatIds = checkForMessage(command)
    if ( chatIds) {
        chatIds.map(chat_id => sendMessage(chat_id, botResponse))
    }
}

let updates;

async function main() {
    updates = await getUpdates()
    createCommandHandler("/start", "Hello I'm a dummy bot used for educational puroses")
    createCommandHandler("/help", "I just said this is a dummy bot built for educational purposes what more help do you need")
}

main()