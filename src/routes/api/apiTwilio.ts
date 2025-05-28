import pkg from 'twilio'
const { Twilio } = pkg
import type { TokenApiSysSendText } from '$utils/types.token'
import { type DataRecord, MethodResult } from '$utils/types'
import {
	TWILIO_ACCT_SID,
	TWILIO_AUTH_TOKEN,
	TWILIO_PHONE_NBR,
	TWILIO_MAXPRICE
} from '$env/static/private'
import { error } from '@sveltejs/kit'

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

	let result: DataRecord = {}

	try {
		const message = await twilio.messages.create(parms)
		result = { sid: message.sid, parms }
	} catch (err) {
		const msg =
			`Attempt to send text failed...` +
			'\n' +
			'Error: ' +
			JSON.stringify(err) +
			'\n' +
			'Parms: ' +
			JSON.stringify(parms)
		result = {
			error: {
				file: FILENAME,
				function: 'sendText',
				msg
			}
		}
	}
	return new MethodResult(result)
}
