var handlers = module.exports = {};


const axios = require('axios');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const USER_ACCESS_TOKEN = "EAACMaejP8x0BAP1ksJ87BnMpqkYUwaBTpQQcZAHlAX0VjKz5LBs647HJ37gJ23kGTjZA7MJzseGpC1zsCdFD7bZACXTogfveNxzRKSAhZCq7jAcsRM2JKuHcW3Wi7Mnr6ZAB4ZBDISsppEU0ZBuWGkHdCkZBSzNiPYxBvloEXyGb0HLoAMUiZCyhR2z5hFF1U7BXZB1Rcp0ZABa1QZDZD";

// Handles messages events
handlers.handleMessage = (sender_psid, received_message) => {
	let response;

	// Check if the message contains text
	if (received_message.text) {
		// Create the payload for a basic text message
		response = {
			"text": `You sent the message: "${received_message.text}". Now send me an image!`
		}
	}

	// Sends the response message
	handlers.callSendAPI(sender_psid, response);

}

// Handles messaging_postbacks events
handlers.handlePostback= (sender_psid, received_postback) => {

}

// Sends response messages via the Send API
handlers.callSendAPI = (sender_psid, response) => {
	// Construct the message body
	let request_body = {
	"messaging_type": "RESPONSE",
	"recipient": {
		"id": sender_psid
	},
	"message": response
	}

	// Send the HTTP request to the Messenger Platform
	const url = `https://graph.facebook.com/v2.12/me/messages?access_token=${PAGE_ACCESS_TOKEN}`
	axios.post(url, request_body).catch((err, res, body)=> {
		if (!err) {
			console.log('message sent!')
		} else {
			console.error("Unable to send message: " + err);
		}
	});


	// axios({
	// 	"url": "https://graph.facebook.com/v2.12/me/messages",
	// 	"qs": { "access_token": PAGE_ACCESS_TOKEN },
	// 	"method": "POST",
	// 	"json": request_body
	// })
	// .catch((err, res, body)=> {
	// 	if (!err) {
	// 		console.log('message sent!')
	// 	} else {
	// 		console.error("Unable to send message:" + err);
	// 	}
	// });


	// request({
	// 	"uri": "https://graph.facebook.com/v2.6/me/messages",
	// 	"qs": { "access_token": PAGE_ACCESS_TOKEN },
	// 	"method": "POST",
	// 	"json": request_body
	// }, (err, res, body) => {
	// 	if (!err) {
	// 		console.log('message sent!')
	// 	} else {
	// 		console.error("Unable to send message:" + err);
	// 	}
	// }); 
}