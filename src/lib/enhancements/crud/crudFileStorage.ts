import { DataObjActionQueryTriggerTiming } from '$comps/app/types.appQuery'
import { State } from '$comps/app/types.appState'
import { objDelete, objUpload } from '$utils/utils.aws'
import type { ResponseBody } from '$utils/types'
import { DataObjData, type DataRecord, DataRecordStatus, required, ToastType } from '$utils/types'
import {
	TokenApiFileParm,
	TokenApiFileAction,
	TokenApiFileType,
	TokenApiQueryType
} from '$utils/types.token'
import { FileStorage } from '$comps/form/fieldFile'
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
	if (queryType !== TokenApiQueryType.save) return dataUpdate

	switch (queryTiming) {
		case DataObjActionQueryTriggerTiming.pre:
			const fileParm: TokenApiFileParm = dataUpdate.getDetailRecordValue(parms.imageField)
			if (fileParm) {
				fileAction = dataUpdate.getDetailStatusRecordIs(DataRecordStatus.delete)
					? TokenApiFileAction.delete
					: fileParm.fileAction
						? fileParm.fileAction
						: TokenApiFileAction.none
			} else {
				fileAction = TokenApiFileAction.none
			}

			switch (fileAction) {
				case TokenApiFileAction.delete:
					dataUpdate.setDetailRecordValue(parms.imageField, undefined)
					if (fileParm.key) {
						key = fileParm.key
					} else {
						fileAction = TokenApiFileAction.none
					}
					break

				case TokenApiFileAction.none:
					break

				case TokenApiFileAction.upload:
					file = required(fileParm.file, FILENAME, 'file')
					const fileName = required(file?.name, FILENAME, 'file.name')
					const fileType = required(fileParm.fileType, FILENAME, 'fileType')
					key = required(fileParm.key, FILENAME, 'key')
					uploadData = new FileStorage(fileName, fileType, key)
					dataUpdate.setDetailRecordValue(parms.imageField, uploadData)
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'qaExecuteFileStorage',
						message: `No case defined for TriggerTiming: pre, fileAction: ${fileAction}`
					})
			}
			break

		case DataObjActionQueryTriggerTiming.post:
			switch (fileAction) {
				case TokenApiFileAction.delete:
					await fileDelete(state, key)
					break

				case TokenApiFileAction.none:
					break

				case TokenApiFileAction.upload:
					await fileUpload(state, uploadData, file)
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'qaExecuteFileStorage',
						message: `No case defined for TriggerTiming: post, fileAction: ${fileAction}`
					})
			}
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'qaExecuteFileStorage',
				message: `No case defined for queryTiming: ${queryTiming}`
			})
	}
	return dataUpdate
}

const fileDelete = async function (state: State, key: string) {
	const result: ResponseBody = await objDelete(key)
	if (!result.success) {
		alert(`Unabled to delete avatar. Processing cancelled.`)
		return
	}
	state.openToast(ToastType.success, 'Avatar deleted successfully!')
}

const fileUpload = async function (state: State, uploadData: FileStorage, file: File) {
	const key =
		uploadData.fileType === TokenApiFileType.image ? 'raw/' + uploadData.key : uploadData.key
	const result: ResponseBody = await objUpload(key, file)
	if (!result.success) {
		alert(`Unabled to upload ${file.name}. Processing cancelled.`)
		return
	}
	state.openToast(ToastType.success, 'Avatar uploaded successfully!')
}
