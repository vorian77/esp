import { type DataRecord, getArray, MethodResult, User } from '$utils/types'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { TokenApiUserParmsSet } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = 'utils.parmsUser.ts'

export class UserParm {
	idFeature: number
	items: UserParmItem[] = []
	user: User
	constructor(
		idFeature: number,
		itemsSource: UserParmItemSource | UserParmItemSource[],
		user: User,
		parmsDataRaw: DataRecord[]
	) {
		this.idFeature = idFeature
		this.user = user

		// derived
		this.items = getArray(itemsSource).map((source) => {
			return new UserParmItem(this.user.id, source, getArray(parmsDataRaw))
		})
	}

	itemDataGet(type: UserParmItemType): MethodResult {
		const item = this.items.find((p) => p.source.type === type)
		return item
			? item.source.parmsGet(item.data)
			: new MethodResult({
					error: {
						file: FILENAME,
						function: 'UserParm.parmsGet',
						msg: `Cannot find item for type ${type}`
					}
				})
	}

	itemDataSet(type: UserParmItemType, data: any) {
		let item = this.items.find((p) => p.source.type === type)
		if (item) item.dataSet(data)
	}

	async parmsSave() {
		const saveData = this.items.map((item) => {
			return new UserParmItemSave(this.idFeature, item)
		})
		console.log('UserParm.parmsSave', saveData)
		await apiFetchFunction(ApiFunction.sysUserParmsSet, new TokenApiUserParmsSet(saveData))
	}
}

export class UserParmItem {
	data: DataRecord
	idUser: string
	source: UserParmItemSource
	constructor(idUser: string, source: UserParmItemSource, parmsDataRaw: DataRecord[]) {
		const clazz = 'UserParmItem'
		this.idUser = idUser
		this.source = source

		// derived
		const parmsDataRawType = parmsDataRaw.find((p) => p._codeType === source.type)
		this.data = parmsDataRawType ? parmsDataRawType.parmData : {}
	}
	dataSet(data: any) {
		this.data = data ? this.source.dataSet(data) : {}
	}
}

export class UserParmItemFeature {
	data: any
	type: UserParmItemType
	constructor(type: UserParmItemType, data: any) {
		const clazz = 'UserParmItemFeature'
		this.data = data
		this.type = type
	}
}

export class UserParmItemSave {
	data: any
	idFeature: number
	idUser: string
	type: UserParmItemType
	constructor(idFeature: number, item: UserParmItem) {
		const clazz = 'UserParmItemSave'
		this.data = item.data
		this.idFeature = idFeature
		this.idUser = item.idUser
		this.type = item.source.type
	}
}

export class UserParmItemSource {
	dataGet: Function
	dataSet: Function
	type: UserParmItemType
	constructor(type: UserParmItemType, dataGet: Function, dataSet: Function) {
		const clazz = 'UserParmItemSource'
		this.dataGet = dataGet
		this.dataSet = dataSet
		this.type = type
	}
	parmsGet(data: any): MethodResult {
		return new MethodResult(this.dataGet(data))
	}
}

export enum UserParmItemType {
	listColumnsModel = 'listColumnsModel',
	listFilterModel = 'listFilterModel',
	listFilterQuick = 'listFilterQuick',
	listSortModel = 'listSortModel',
	selectList = 'selectList'
}
