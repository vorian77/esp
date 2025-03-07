import { State } from '$comps/app/types.appState.svelte'
import {
	DataObjData,
	DataObjQueryRider,
	DataObjQueryRiderTriggerTiming,
	type DataRecord,
	DataRecordStatus,
	debug,
	required,
	strRequired,
	ToastType
} from '$utils/types'
import { apiFetch, apiFetchFunction, ApiFunction } from '$routes/api/api'
import {
	TokenApiFetchError,
	TokenApiFetchMethod,
	TokenApiFileParmDelete,
	TokenApiBlobParmUpload,
	TokenApiBlobAction,
	TokenApiQueryType
} from '$utils/types.token'
import { FileStorage } from '$comps/form/fieldFile'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/queryRiderFunctions/qrfFileUpload.ts'

let fileAction: TokenApiBlobAction | undefined

export async function qrfFileStorage(
	sm: State,
	queryRider: DataObjQueryRider,
	dataQuery: DataObjData
): Promise<DataObjData> {
	const fileKeyData = strRequired(queryRider.functionParmValue, FILENAME, 'fileKeyData')
	const fileParm: DataRecord | TokenApiFileParmDelete | TokenApiBlobParmUpload | undefined =
		dataQuery.rowsSave.getDetailRecordValue(fileKeyData)
	if (!fileParm || queryRider.codeQueryType !== TokenApiQueryType.save) return dataQuery

	if (queryRider.codeTriggerTiming === DataObjQueryRiderTriggerTiming.pre) {
		fileAction = dataQuery.rowsSave.getDetailRowStatusIs(DataRecordStatus.delete)
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
					await blobDelete(sm, url, true)
					dataQuery.rowsSave.setDetailRecordValue(fileKeyData, undefined)
				}
				break

			case TokenApiBlobAction.none:
				// no change
				break

			case TokenApiBlobAction.upload:
				if (fileParm instanceof TokenApiBlobParmUpload) {
					if (fileParm.urlOld) await blobDelete(sm, fileParm.urlOld, false)
					await blobUpload(sm, fileParm, dataQuery, fileKeyData)
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
	return dataQuery
}

const blobDelete = async function (sm: State, url: string, isShowMsg: boolean) {
	const result = await apiFetch(
		'/api/vercel',
		TokenApiFetchMethod.post,
		new TokenApiFetchError(FILENAME, 'blobDelete', `Unable to delete blob: ${url}.`),
		{ formData: { fileAction: TokenApiBlobAction.delete, url } }
	)
	if (isShowMsg) sm.openToast(ToastType.success, `File successfully deleted.`)
	return result
}

const blobUpload = async function (
	sm: State,
	fileParm: TokenApiBlobParmUpload,
	dataQuery: DataObjData,
	fileFieldKey: string
) {
	const file = required(fileParm.file, FILENAME, 'file')
	const fileName = required(file.name, FILENAME, 'file.name')

	const result = await apiFetch(
		'/api/vercel',
		TokenApiFetchMethod.post,
		new TokenApiFetchError(FILENAME, 'blobUpload', `Unable to upload blob: ${fileName}.`),
		{ formData: { file, fileAction: TokenApiBlobAction.upload, key: fileParm.key } }
	)

	const fileStorage = new FileStorage({
		downloadUrl: result.downloadUrl,
		fileName,
		fileType: fileParm.fileType,
		key: fileParm.key,
		url: result.url
	})

	dataQuery.rowsSave.setDetailRecordValue(fileFieldKey, fileStorage)
	sm.openToast(ToastType.success, `File ${fileName} successfully uploaded.`)
}
