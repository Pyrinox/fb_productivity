var handlers = module.exports = {};


const axios = require('axios');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

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
	axios({
		"url": "https://graph.facebook.com/v2.12/me/messages",
		"qs": { "access_token": PAGE_ACCESS_TOKEN },
		"method": "POST",
		"json": request_body
	})
	.catch((err, res, body)=> {
		if (!err) {
			console.log('message sent!')
		} else {
			console.error("Unable to send message:" + err);
		}
	});


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