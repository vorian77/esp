import { State } from '$comps/app/types.appState.svelte'
import {
	DataObjData,
	type DataRecord,
	DataRecordStatus,
	debug,
	FileStorage,
	MethodResult,
	required,
	strRequired,
	ToastType
} from '$utils/types'
import { QueryRider, QueryRiderTriggerTiming } from '$enhance/queryRider/types.queryRider'
import { apiFetch } from '$routes/api/api'
import {
	TokenApiFetchMethod,
	TokenApiFileParmDelete,
	TokenApiBlobParmUpload,
	TokenApiBlobAction,
	TokenApiQueryType
} from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/queryRiderFunctions/qrfFileUpload.ts'

let fileAction: TokenApiBlobAction | undefined
let resultReturn: MethodResult

export async function qrfFileStorage(
	sm: State,
	queryRider: QueryRider,
	dataQuery: DataObjData
): Promise<MethodResult> {
	const fileKeyData = strRequired(queryRider.functionParmValue, FILENAME, 'fileKeyData')
	const fileParm: DataRecord | TokenApiFileParmDelete | TokenApiBlobParmUpload | undefined =
		dataQuery.rowsSave.getDetailRecordValue(fileKeyData)
	if (!fileParm || queryRider.codeQueryType !== TokenApiQueryType.save) {
		return new MethodResult(dataQuery)
	}

	if (queryRider.codeTriggerTiming === QueryRiderTriggerTiming.pre) {
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
					resultReturn = await blobDelete(sm, url, true, dataQuery, fileKeyData)
					if (resultReturn.error) return resultReturn
					dataQuery.rowsSave.setDetailRecordValue(fileKeyData, undefined)
				}
				break

			case TokenApiBlobAction.none:
				// no change
				break

			case TokenApiBlobAction.upload:
				if (fileParm instanceof TokenApiBlobParmUpload) {
					if (fileParm.urlOld) {
						resultReturn = await blobDelete(sm, fileParm.urlOld, false, dataQuery, fileKeyData)
						if (resultReturn.error) return resultReturn
					}
					resultReturn = await blobUpload(sm, fileParm, dataQuery, fileKeyData)
					if (resultReturn.error) return resultReturn
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'qaExecuteFileStorage',
					msg: `No case defined for TriggerTiming: pre, fileAction: ${fileAction}`
				})
		}
	}
	return new MethodResult(dataQuery)
}

const blobDelete = async function (
	sm: State,
	url: string,
	isShowMsg: boolean,
	dataQuery: DataObjData,
	fileFieldKey: string
) {
	const resultReturn: MethodResult = await apiFetch('/api/vercel', {
		method: TokenApiFetchMethod.post,
		formData: { fileAction: TokenApiBlobAction.delete, url }
	})
	if (!resultReturn.error) {
		dataQuery.rowsSave.setDetailRecordValue(fileFieldKey, null)
		if (isShowMsg) sm.openToast(ToastType.success, `File successfully deleted.`)
	}
	return resultReturn
}

export const blobList = async function () {
	return (await apiFetch('/api/vercel', {
		method: TokenApiFetchMethod.post,
		formData: { fileAction: TokenApiBlobAction.list }
	})) as MethodResult
}

const blobUpload = async function (
	sm: State,
	fileParm: TokenApiBlobParmUpload,
	dataQuery: DataObjData,
	fileFieldKey: string
) {
	const file = required(fileParm.file, FILENAME, 'file')
	const fileName = required(file.name, FILENAME, 'file.name')
	const resultReturn = await apiFetch('/api/vercel', {
		method: TokenApiFetchMethod.post,
		formData: { file, fileAction: TokenApiBlobAction.upload, key: fileParm.key }
	})
	if (!resultReturn.error) {
		const fileStorage = new FileStorage({
			downloadUrl: resultReturn.data.downloadUrl,
			fileName,
			fileType: fileParm.fileType,
			key: fileParm.key,
			url: resultReturn.data.url
		})
		dataQuery.rowsSave.setDetailRecordValue(fileFieldKey, fileStorage)
		sm.openToast(ToastType.success, `File ${fileName} successfully uploaded.`)
	}
	return resultReturn
}
