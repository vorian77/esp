import { del, list, put } from '@vercel/blob'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'
import { TokenApiFileAction } from '$utils/types.token'
import { debug, getServerResponse, required, type DataRecord } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$src/routes/api/vercel/+server.ts'

export async function POST({ request }) {
	const formData = await request.formData()
	const fileAction = formData.get('fileAction')

	switch (fileAction) {
		case TokenApiFileAction.delete:
			const url = required(formData.get('url'), FILENAME, 'url')
			await del(url, {
				token: BLOB_READ_WRITE_TOKEN
			})
			debug('apiVercelBlog.blobDelete', 'complete')
			return getServerResponse({ success: true })

		case TokenApiFileAction.list:
			const { blobs } = await list({
				token: BLOB_READ_WRITE_TOKEN
			})
			return getServerResponse({ success: true, data: blobs })

		case TokenApiFileAction.upload:
			const file = required(formData.get('file'), FILENAME, 'file')
			const fileName = required(file.name, FILENAME, 'file.name')
			const key = required(formData.get('key'), FILENAME, 'key')
			const result: DataRecord = await put(key, file, {
				access: 'public',
				token: BLOB_READ_WRITE_TOKEN
			})
			debug('apiVercelBlog.blobUpload', 'result', result)
			return getServerResponse({ success: true, data: result })

		default:
			error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for TokenApiFileAction: ${fileAction}`
			})
	}
}

// const fileList = async function (state: State) {
// 	const formData = new FormData()
// 	formData.set('fileAction', TokenApiFileAction.list)
// 	const responsePromise: Response = await fetch('/api/vercel', {
// 		method: 'POST',
// 		body: formData
// 	})
// 	return await responsePromise.json()
// }
