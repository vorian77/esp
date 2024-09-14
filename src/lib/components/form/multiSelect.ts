import {
	State,
	StateLayoutComponentType,
	StateLayoutStyle,
	StatePacket,
	StatePacketAction,
	StateSurfaceModal
} from '$comps/app/types.appState'
import { TokenAppDoActionConfirmType } from '$utils/types.token'
import { type DataItems } from '$comps/dataObj/types.dataObj'
import { ParmsValues } from '$utils/types'

import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiId } from '$utils/types.token'
import { ResponseBody } from '$utils/types'
import { DataObj } from '$utils/types'

import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/multiSelect.ts'

export async function openMultiSelectModal(
	state: State,
	itemsList: DataItems,
	currentItems: string[],
	fModalCloseUpdate: Function
) {
	console.log('openMultiSelectModal:', { itemsList, currentItems })

	const parmsState = new ParmsValues()
	// parmsState.valueSet(ParmsObjType.embedFieldName, field.colDO.propName);
	// actionsFieldDialog: field.actionsFieldModal,

	const stateModal = new StateSurfaceModal({
		actionsFieldDialog: await getActions(),
		layoutComponent: StateLayoutComponentType.layoutSelectMulti,
		layoutStyle: StateLayoutStyle.overlayModalSelectMulti,
		packet: new StatePacket({
			action: StatePacketAction.none,
			confirmType: TokenAppDoActionConfirmType.none
		}),
		parmsState
	})
	await state.openModal(stateModal, fModalCloseUpdate)
}

async function getActions() {
	const name = 'doag_dialog_footer_list'
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeGetDataObjActionFieldGroup,
		new TokenApiId(name)
	)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'getAction',
			message: `Error retrieving data object action field group: ${name}`
		})
	}
}
