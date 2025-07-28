import { del, list, put } from '@vercel/blob'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'
import { TokenApiBlobAction } from '$utils/types.token'
import { debug, getServerResponse, MethodResult, required, type DataRecord } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$src/routes/api/vercel/+server.ts'

let result: any

export async function POST({ request }) {
	const formData = await request.formData()
	const fileAction = formData.get('fileAction')
	switch (fileAction) {
		case TokenApiBlobAction.delete:
			const url = required(formData.get('url'), FILENAME, 'url')
			try {
				result = await del(url, {
					token: BLOB_READ_WRITE_TOKEN
				})
			} catch (error) {
				result = {
					error: {
						file: FILENAME,
						function: 'deleteBlob',
						msgSystem: `Unable to delete blob - url:${url}.`,
						msgUser: `Unable to delete blob.`
					}
				}
			}
			return getServerResponse(new MethodResult(result))

		case TokenApiBlobAction.list:
			try {
				const { blobs } = await list({
					token: BLOB_READ_WRITE_TOKEN
				})
				result = blobs
			} catch (error) {
				result = {
					error: {
						file: FILENAME,
						function: 'getBlobList',
						msg: `Unable to retrieve blob list.`
					}
				}
			}
			return getServerResponse(new MethodResult(result))

		case TokenApiBlobAction.upload:
			const file = required(formData.get('file'), FILENAME, 'file')
			const key = required(formData.get('key'), FILENAME, 'key')
			try {
				result = await put(key, file, {
					access: 'public',
					token: BLOB_READ_WRITE_TOKEN
				})
			} catch (error) {
				result = {
					error: {
						file: FILENAME,
						function: 'getBlobList',
						msg: `Unable to upload blob file: ${file} - key: ${key}.`
					}
				}
			}
			return getServerResponse(new MethodResult(result))

		default:
			error(500, {
				file: FILENAME,
				function: 'POST',
				msg: `No case defined for TokenApiFileAction: ${fileAction}`
			})
	}
}
