import { DataObjActionQueryTriggerTiming } from '$comps/app/types.appQuery'
import { State } from '$comps/app/types.appState'
import { objDelete, objUpload } from '$utils/utils.aws'
import type { ResponseBody } from '$utils/types'
import { DataObjData, type DataRecord, DataRecordStatus, ToastType } from '$utils/types'
import {
	TokenApiFileUpload,
	TokenApiFileUploadData,
	TokenApiFileUploadAction,
	TokenApiQueryType
} from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/crud/crudFileUpload.ts'

let file: File | undefined = undefined
let fileAction: TokenApiFileUploadAction | undefined
let storageKey: string | undefined
let uploadData: TokenApiFileUploadData

export async function qaExecuteFileStorage(
	queryActionName: string,
	state: State,
	queryType: TokenApiQueryType,
	queryTiming: DataObjActionQueryTriggerTiming,
	table: string | undefined,
	dataUpdate: DataObjData,
	parms: DataRecord
): Promise<DataObjData> {
	const fieldData: TokenApiFileUpload = dataUpdate.getDetailRecordValue(parms.imageField)

	if (queryType !== TokenApiQueryType.save) return dataUpdate

	if (queryTiming === DataObjActionQueryTriggerTiming.pre) {
		fileAction = dataUpdate.getDetailStatusRecordIs(DataRecordStatus.delete)
			? TokenApiFileUploadAction.delete
			: fieldData.fileAction

		switch (fileAction) {
			case TokenApiFileUploadAction.delete:
				storageKey = fieldData.storageKey
				dataUpdate.setDetailRecordValue(parms.imageField, {})
				break

			case TokenApiFileUploadAction.none:
				break

			case TokenApiFileUploadAction.upload:
				file = fieldData.file
				uploadData = new TokenApiFileUploadData(
					fieldData.storageKey!,
					fieldData.fileName!,
					fieldData.fileType!
				)
				dataUpdate.setDetailRecordValue(parms.imageField, uploadData)
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'qaExecuteFileStorage',
					message: `Invalid fileAction: ${fieldData.fileAction}`
				})
		}
	} else {
		switch (fileAction) {
			case TokenApiFileUploadAction.delete:
				if (storageKey) await fileDelete(state, storageKey)
				break

			case TokenApiFileUploadAction.none:
				break

			case TokenApiFileUploadAction.upload:
				if (uploadData && uploadData.storageKey && file) {
					await fileUpload(state, uploadData, file)
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'qaExecuteFileStorage',
					message: `Invalid fileAction: ${fieldData.fileAction}`
				})
		}
	}
	return dataUpdate
}

const fileDelete = async function (state: State, storageKey: string) {
	const result: ResponseBody = await objDelete(storageKey)
	if (!result.success) {
		alert(`Unabled to delete avatar. Processing cancelled.`)
		return
	}
	state.openToast(ToastType.success, 'Avatar deleted successfully!')
}

const fileUpload = async function (state: State, uploadData: TokenApiFileUploadData, file: File) {
	const storageKey = uploadData.isImage ? 'raw/' + uploadData.storageKey : uploadData.storageKey
	const result: ResponseBody = await objUpload(storageKey, file)
	if (!result.success) {
		alert(`Unabled to upload ${file.name}. Processing cancelled.`)
		return
	}
	state.openToast(ToastType.success, 'Avatar uploaded successfully!')
}
