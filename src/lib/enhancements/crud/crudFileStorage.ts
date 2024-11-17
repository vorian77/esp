import { DataObjActionQueryTriggerTiming } from '$comps/app/types.appQuery'
import { State } from '$comps/app/types.appState'
import { objDeleteAws, objUploadAws } from '$utils/utils.aws'
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
	TokenApiFileParmUpload,
	TokenApiFileAction,
	TokenApiFileType,
	TokenApiQueryType
} from '$utils/types.token'
import { FileStorage } from '$comps/form/fieldFile'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/crud/crudFileUpload.ts'

let file: File
let fileAction: TokenApiFileAction | undefined
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
	const fileParm: DataRecord | TokenApiFileParmDelete | TokenApiFileParmUpload | undefined =
		dataUpdate.rowsSave.getDetailRecordValue(parms.imageField)
	if (!fileParm || queryType !== TokenApiQueryType.save) return dataUpdate

	if (queryTiming === DataObjActionQueryTriggerTiming.pre) {
		fileAction = dataUpdate.rowsSave.getDetailRowStatusIs(DataRecordStatus.delete)
			? TokenApiFileAction.delete
			: fileParm instanceof TokenApiFileParmDelete
				? TokenApiFileAction.delete
				: fileParm instanceof TokenApiFileParmUpload
					? TokenApiFileAction.upload
					: TokenApiFileAction.none

		switch (fileAction) {
			case TokenApiFileAction.delete:
				let url = ''
				if (fileParm instanceof TokenApiFileParmDelete) {
					url = fileParm.urlOld
				} else if (fileParm instanceof TokenApiFileParmUpload) {
					if (fileParm.urlOld) url = fileParm.urlOld
				} else {
					url = fileParm.url
				}
				if (url) {
					await blobDelete(state, url)
					dataUpdate.rowsSave.setDetailRecordValue(parms.imageField, undefined)
				}
				break

			case TokenApiFileAction.none:
				// no change
				break

			case TokenApiFileAction.upload:
				if (fileParm instanceof TokenApiFileParmUpload) {
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
	formData.set('fileAction', TokenApiFileAction.delete)
	formData.set('url', url)

	const responsePromise: Response = await fetch('/api/vercel', {
		method: 'POST',
		body: formData
	})
	const result = await responsePromise.json()
	debug('crudFileStorage.fileDelete', 'result', result)
}

const blobUpload = async function (
	state: State,
	fileParm: TokenApiFileParmUpload,
	dataUpdate: DataObjData,
	parms: DataRecord
) {
	const file = required(fileParm.file, FILENAME, 'file')
	const fileName = required(file.name, FILENAME, 'file.name')

	const formData = new FormData()
	formData.set('fileAction', TokenApiFileAction.upload)
	formData.set('file', file)
	formData.set('key', fileParm.key)

	const responsePromise: Response = await fetch('/api/vercel', {
		method: 'POST',
		body: formData
	})
	const result = await responsePromise.json()
	debug('crudFileStorage.fileUpload', 'result', result)

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
