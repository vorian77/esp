import { DataObjActionQueryTriggerTiming } from '$comps/app/types.appQuery'
import { State } from '$comps/app/types.appState.svelte'
import type { ResponseBody } from '$utils/types'
import {
	DataObjData,
	type DataRecord,
	DataRecordStatus,
	debug,
	required,
	strRequired,
	ToastType
} from '$utils/types'
import {
	TokenApiFileParmDelete,
	TokenApiBlobParmUpload,
	TokenApiBlobAction,
	TokenApiBlobType,
	TokenApiQueryType
} from '$utils/types.token'
import { FileStorage } from '$comps/form/fieldFile'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/crud/crudFileUpload.ts'

let file: File
let fileAction: TokenApiBlobAction | undefined
let key: string
let uploadData: FileStorage

export async function qaExecuteFileStorage(
	queryActionName: string,
	state: State,
	queryType: TokenApiQueryType,
	queryTiming: DataObjActionQueryTriggerTiming,
	table: string | undefined,
	dataUpdate: DataObjData,
	parms: DataRecord
): Promise<DataObjData> {
	const fileParm: DataRecord | TokenApiFileParmDelete | TokenApiBlobParmUpload | undefined =
		dataUpdate.rowsSave.getDetailRecordValue(parms.imageField)
	if (!fileParm || queryType !== TokenApiQueryType.save) return dataUpdate

	if (queryTiming === DataObjActionQueryTriggerTiming.pre) {
		fileAction = dataUpdate.rowsSave.getDetailRowStatusIs(DataRecordStatus.delete)
			? TokenApiBlobAction.delete
			: fileParm instanceof TokenApiFileParmDelete
				? TokenApiBlobAction.delete
				: fileParm instanceof TokenApiBlobParmUpload
					? TokenApiBlobAction.upload
					: TokenApiBlobAction.none

		switch (fileAction) {
			case TokenApiBlobAction.delete:
				let url = ''
				if (fileParm instanceof TokenApiFileParmDelete) {
					url = fileParm.urlOld
				} else if (fileParm instanceof TokenApiBlobParmUpload) {
					if (fileParm.urlOld) url = fileParm.urlOld
				} else {
					url = fileParm.url
				}
				if (url) {
					await blobDelete(state, url)
					dataUpdate.rowsSave.setDetailRecordValue(parms.imageField, undefined)
				}
				break

			case TokenApiBlobAction.none:
				// no change
				break

			case TokenApiBlobAction.upload:
				if (fileParm instanceof TokenApiBlobParmUpload) {
					if (fileParm.urlOld) await blobDelete(state, fileParm.urlOld)
					await blobUpload(state, fileParm, dataUpdate, parms)
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'qaExecuteFileStorage',
					message: `No case defined for TriggerTiming: pre, fileAction: ${fileAction}`
				})
		}
	}
	return dataUpdate
}

const blobDelete = async function (state: State, url: string) {
	const formData = new FormData()
	formData.set('fileAction', TokenApiBlobAction.delete)
	formData.set('url', url)

	const responsePromise: Response = await fetch('/api/vercel', {
		method: 'POST',
		body: formData
	})
	const result = await responsePromise.json()
}

const blobUpload = async function (
	state: State,
	fileParm: TokenApiBlobParmUpload,
	dataUpdate: DataObjData,
	parms: DataRecord
) {
	const file = required(fileParm.file, FILENAME, 'file')
	const fileName = required(file.name, FILENAME, 'file.name')

	const formData = new FormData()
	formData.set('fileAction', TokenApiBlobAction.upload)
	formData.set('file', file)
	formData.set('key', fileParm.key)

	const responsePromise: Response = await fetch('/api/vercel', {
		method: 'POST',
		body: formData
	})
	const result = await responsePromise.json()

	dataUpdate.rowsSave.setDetailRecordValue(
		parms.imageField,
		new FileStorage({
			downloadUrl: result.data.downloadUrl,
			fileName,
			fileType: fileParm.fileType,
			key: fileParm.key,
			url: result.data.url
		})
	)
	state.openToast(ToastType.success, `File '${fileName}' uploaded successfully!`)
}
