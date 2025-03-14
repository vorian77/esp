import pkg from 'twilio'
const { Twilio } = pkg
import type { TokenApiSysSendText } from '$utils/types.token'
import { error } from '@sveltejs/kit'
import {
	TWILIO_ACCT_SID,
	TWILIO_AUTH_TOKEN,
	TWILIO_PHONE_NBR,
	TWILIO_MAXPRICE
} from '$env/static/private'

const FILENAME = '$routes/api/apiTtwilio.ts'

export async function sysSendText(token: TokenApiSysSendText) {
	const twilio = new Twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN)

	// parms
	const parms = {
		from: TWILIO_PHONE_NBR,
		to: token.phoneMobile,
		body: token.message,
		MaxPrice: TWILIO_MAXPRICE
	}

	try {
		const message = await twilio.messages.create(parms)
		return new Response(JSON.stringify({ success: true, data: { sid: message.sid, parms } }))
	} catch (err) {
		error(500, {
			file: FILENAME,
			function: 'sendText',
			message:
				`Attempt to send text failed...` +
				'\n' +
				'Error: ' +
				JSON.stringify(err) +
				'\n' +
				'Parms: ' +
				JSON.stringify(parms)
		})
	}
}
