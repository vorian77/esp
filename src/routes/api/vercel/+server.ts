import { del, list, put } from '@vercel/blob'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'
import { TokenApiBlobAction } from '$utils/types.token'
import { debug, getServerResponse, required, type DataRecord } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$src/routes/api/vercel/+server.ts'

export async function POST({ request }) {
	const formData = await request.formData()
	const fileAction = formData.get('fileAction')

	switch (fileAction) {
		case TokenApiBlobAction.delete:
			const url = required(formData.get('url'), FILENAME, 'url')
			await del(url, {
				token: BLOB_READ_WRITE_TOKEN
			})
			debug('api.vercelBlob', 'delete.url', url)
			return getServerResponse({ success: true })

		case TokenApiBlobAction.list:
			const { blobs } = await list({
				token: BLOB_READ_WRITE_TOKEN
			})
			debug('api.vercelBlob', 'blob.list', blobs)
			return getServerResponse({ success: true, data: blobs })

		case TokenApiBlobAction.upload:
			const file = required(formData.get('file'), FILENAME, 'file')
			const key = required(formData.get('key'), FILENAME, 'key')
			const result: DataRecord = await put(key, file, {
				access: 'public',
				token: BLOB_READ_WRITE_TOKEN
			})
			debug('api.vercelBlob', 'blob.upload', result)
			return getServerResponse({ success: true, data: result })

		default:
			error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for TokenApiFileAction: ${fileAction}`
			})
	}
}
