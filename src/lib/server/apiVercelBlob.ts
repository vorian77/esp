import { put } from '@vercel/blob'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'
import { TokenApiFileParmDelete } from '$utils/types.token'
import { debug, required, ResponseBody } from '$utils/types'
import { ApiResult } from '$routes/api/api'
import { error } from '@sveltejs/kit'

const FILENAME = '/$lib/server/apiVercelBlob.ts'

export async function vercelBlobUpload(fileParm: TokenApiFileParmDelete): Promise<ApiResult> {
	const file = required(fileParm.file, FILENAME, 'file')
	const fileName = required(file?.name, FILENAME, 'file.name')
	const fileType = required(fileParm.fileType, FILENAME, 'fileType')
	const key = required(fileParm.urlOld, FILENAME, 'key')

	debug('apiVercelBlob.vercelBlobUpload', 'key', key)

	const result = await put(key, file, {
		access: 'public',
		token: BLOB_READ_WRITE_TOKEN
	})

	debug('apiVercelBlog.blobUpload', 'result', result)

	return new ApiResult(true, { result })

	// if (!file.name) {
	// 	return new ResponseBody({
	// 		success: false,
	// 		message: `Cannot upload image: ${fileStorageKey}. No image provided.`
	// 	})
	// }

	// const url = await getURL('getURLUpload', fileStorageKey, fileType)
	// return await upload(url, file)

	// async function upload(url: string, imgFile: File) {
	// 	try {
	// 		const resp: Response = await fetch(url, {
	// 			method: 'PUT',
	// 			body: imgFile,
	// 			headers: {
	// 				'Content-Type': imgFile.type
	// 			}
	// 		})

	// 		if (resp.statusText.toLowerCase() === 'ok') {
	// 			return new ResponseBody({ success: true })
	// 		} else {
	// 			return new ResponseBody({ success: false })
	// 		}
	// 	} catch (err) {
	// 		error(500, {
	// 			file: FILENAME,
	// 			function: 'uploadImage',
	// 			message: `Unable to upload image: ${imgFile.name} Error: ${err}`
	// 		})
	// 	}
	// }
}

// export class TokenApiFileParm extends TokenApi {
// 	file?: File
// 	fileAction: TokenApiFileAction
// 	fileType?: TokenApiFileType
// 	key?: string
// 	constructor(obj: any) {
// 		super()
// 		const clazz = 'TokenApiFileParm'
// 		obj = valueOrDefault(obj, {})
// 		this.file = obj.file
// 		this.fileAction = required(obj.fileAction, clazz, 'fileAction')
// 		this.fileType = obj.fileType
// 		this.key = obj.key
// 	}
// }

// export async function sysSendText(token: TokenApiSysSendText) {
// 	const twilio = new Twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN)
// 	parms
// 	const parms = {
// 		from: TWILIO_PHONE_NBR,
// 		to: token.phoneMobile,
// 		body: token.message,
// 		MaxPrice: TWILIO_MAXPRICE
// 	}
// 	try {
// 		const message = await twilio.messages.create(parms)
// 		return new Response(JSON.stringify({ success: true, data: { sid: message.sid, parms } }))
// 	} catch (err) {
// 		error(500, {
// 			file: FILENAME,
// 			function: 'sendText',
// 			message:
// 				`Attempt to send text failed...` +
// 				'\n' +
// 				'Error: ' +
// 				JSON.stringify(err) +
// 				'\n' +
// 				'Parms: ' +
// 				JSON.stringify(parms)
// 		})
// 	}
// }
