import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiId, TokenAppProcess } from '$utils/types.token'
import { ResponseBody } from '$utils/types'
import {
	DataObj,
	DataObjActionField,
	DataObjCardinality,
	DataObjData,
	MetaData
} from '$utils/types'
import {
	State,
	StateLayoutComponentType,
	StateLayoutStyle,
	StateMode,
	StatePacket,
	StatePacketComponent,
	StateSurfaceModal
} from '$comps/app/types.appState'
import { type ModalSettings, getDrawerStore, getModalStore } from '@skeletonlabs/skeleton'
import { ProcessMigrate } from '$utils/utils.process'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/utils.processMigrate.ts'

export async function migrate(state: State, dataObj: DataObj) {
	const migrId = dataObj.data.getDetailRecordValue('id')
	// const action = new DataObjActionField(await getActions())
	const process = new ProcessMigrate()
	const token = new TokenAppProcess(process, 'data_obj_process_sys_admin_migr')
	const stateModal = new StateSurfaceModal({
		// actionsFieldDialog: [action],
		cardinality: DataObjCardinality.detail,
		layoutComponent: StateLayoutComponentType.layoutProcess,
		layoutStyle: StateLayoutStyle.overlayModalDetail,
		parms: { migrId },
		token,
		updateCallback
	})
	state.openModal(stateModal)
}

async function getActions() {
	const name = 'noa_dialog_done'
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeGetDataObjActionField,
		new TokenApiId(name)
	)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'getAction',
			message: `Error retrieving data object action field: ${name}`
		})
	}
}

async function updateCallback(obj: any) {
	// if (obj.packet.token.action === TokenAppDoActionType.listSelfSave) {
	// 	fieldValue = obj.packet.token.data.dataRows.map((r: any) => r.record.id)
	// }
	// stateEmbed = stateEmbed.updateProperties(obj)
	console.log('updateCallback:', obj)
}
