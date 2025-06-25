import { type DataRecord, getArray, hashString, MethodResult, User } from '$utils/types'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { TokenApiUserParmsGet, TokenApiUserParmsSet } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = 'utils.parmsUser.ts'

export class UserParm {
	items: UserParmItem[] = []
	user: User
	constructor(user: User) {
		this.user = user
	}

	getIdFeatureHash(idFeature: any) {
		return typeof idFeature === 'number' ? idFeature : hashString(idFeature)
	}

	async itemsAdd(
		idFeatureSource: any,
		itemsSource: UserParmItemSource | UserParmItemSource[],
		retrieveCurrentParms: boolean
	) {
		itemsSource = getArray(itemsSource)
		const idFeature = this.getIdFeatureHash(idFeatureSource)
		let parmsDataRaw: DataRecord[] = []

		if (retrieveCurrentParms) {
			let result: MethodResult = await apiFetchFunction(
				ApiFunction.sysUserParmsGet,
				new TokenApiUserParmsGet(this.user.id, idFeature)
			)
			if (result.error) return result
			parmsDataRaw = getArray(result.data)
		}

		for (let i = 0; i < itemsSource.length; i++) {
			let item = this.itemFind(idFeature, itemsSource[i].type)
			if (!item) {
				this.items.push(new UserParmItem(this.user.id, idFeature, itemsSource[i], parmsDataRaw))
			} else {
				item.dataSetInit(parmsDataRaw)
			}
		}

		return new MethodResult()
	}

	itemDataGet(idFeatureSource: any, type: UserParmItemType): MethodResult {
		const idFeature = this.getIdFeatureHash(idFeatureSource)
		let item = this.itemFind(idFeature, type)
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

	itemDataSet(idFeatureSource: any, type: UserParmItemType, data: any) {
		const idFeature = this.getIdFeatureHash(idFeatureSource)
		let item = this.itemFind(idFeature, type)
		if (item) item.dataSet(data)
	}

	async parmsSave(idFeatureSource: any): Promise<MethodResult> {
		const idFeature = this.getIdFeatureHash(idFeatureSource)
		const saveData = this.items
			.filter((i) => {
				return i.idFeature === idFeature
			})
			.map((item) => {
				return new UserParmItemSave(idFeature, item)
			})
		return await apiFetchFunction(ApiFunction.sysUserParmsSet, new TokenApiUserParmsSet(saveData))
	}

	itemFind(idFeature: number, type: UserParmItemType): UserParmItem | undefined {
		if (!idFeature) return undefined
		return this.items.find((p) => p.idFeature === idFeature && p.source.type === type)
	}
}

export class UserParmItem {
	data: DataRecord = {}
	idFeature: number
	idUser: string
	source: UserParmItemSource
	constructor(
		idUser: string,
		idFeature: number,
		source: UserParmItemSource,
		parmsDataRaw: DataRecord[]
	) {
		const clazz = 'UserParmItem'
		this.idFeature = idFeature
		this.idUser = idUser
		this.source = source

		// derived
		this.dataSetInit(parmsDataRaw)
	}
	dataSet(data: any) {
		this.data = data ? this.source.dataSet(data) : {}
	}
	dataSetInit(parmsDataRaw: DataRecord[]) {
		const parmsDataRawType = parmsDataRaw.find((p) => p._codeType === this.source.type)
		this.data = parmsDataRawType ? parmsDataRawType.parmData : {}
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
	menuWidgetsPinned = 'menuWidgetsPinned',
	selectList = 'selectList'
}
