import {
	ObjAttrTypeAccess,
	RawObjAttrAccess,
	RawObjAttrAction,
	RawObjAttrVirtual,
	User
} from '$utils/types'
import { arrayOfClass, MethodResult, valueOrDefault } from '$utils/utils'
import { TokenApiIds, TokenApiQueryData } from '$utils/types.token'
import { getObjAttrTypeApp, getObjAttrTypeTask } from '$routes/api/db/dbGel/dbGelQueries'
import { dbQueryExpr } from '$server/types.queryServer'
import { type RawDataList } from '$lib/queryClient/types.queryClient'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/home/types.rawUser.ts'

export class RawUserAttr {
	_attrsAccess: RawObjAttrAccess[]
	_attrsAction: RawObjAttrAction[]
	_attrsVirtual: RawObjAttrVirtual[]
	_attrsAccessIdAllow: string[] = []
	_attrsAccessIdDeny: string[] = []
	_resources_app: any[] = []
	_resources_task: any[] = []
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawUserAttr'
		this._attrsAccess = arrayOfClass(RawObjAttrAccess, obj._attrsAccess)
		this._attrsAction = arrayOfClass(RawObjAttrAction, obj._attrsAction)
		this._attrsVirtual = arrayOfClass(RawObjAttrVirtual, obj._attrsVirtual)
	}

	async setAttrs(rawUser: any): Promise<MethodResult> {
		const user = new User(rawUser)
		let result: MethodResult = await this.setAttrsVirtual(user)
		if (result.error) return result

		// set attrs unique set
		this._attrsAccess = this.setAttrsType(RawObjAttrAccess, this._attrsAccess)
		this._attrsAction = this.setAttrsType(RawObjAttrAction, this._attrsAction)

		// set resources
		result = await this.setAttrsResources(rawUser, user)
		if (result.error) return result
		rawUser = result.data

		return new MethodResult(rawUser)
	}

	async setAttrsResources(rawUser: RawUserAttr, user: User): Promise<MethodResult> {
		rawUser._attrsAccessIdDeny = this._attrsAccess
			.filter((a: RawObjAttrAccess) => a._codeAttrTypeAccess === ObjAttrTypeAccess.deny)
			.map((a) => a._obj.id)

		rawUser._attrsAccessIdAllow = this._attrsAccess
			.filter(
				(a: RawObjAttrAccess) =>
					a._codeAttrTypeAccess === ObjAttrTypeAccess.allow &&
					!rawUser._attrsAccessIdDeny.includes(a._obj.id)
			)
			.map((a) => a._obj.id)

		rawUser._resources_app = await getObjAttrTypeApp(new TokenApiIds(rawUser._attrsAccessIdAllow))
		rawUser._resources_task = await getObjAttrTypeTask(new TokenApiIds(rawUser._attrsAccessIdAllow))

		return new MethodResult(rawUser)
	}

	async setAttrsVirtual(user: User): Promise<MethodResult> {
		const evalExprContext = `${FILENAME}.setAttrsVirtual`
		const queryData = new TokenApiQueryData({ user })
		for (let i = 0; i < this._attrsVirtual.length; i++) {
			const virtual: RawObjAttrVirtual = this._attrsVirtual[i]
			const expr = virtual.expr

			let result: MethodResult = await dbQueryExpr({ expr, evalExprContext, queryData })
			if (result.error) return result
			const rawDataList: RawDataList = result.data
			const addAttriubutes = rawDataList[0]

			if (addAttriubutes) {
				virtual._attrsAccess.forEach((attr: any) => {
					this._attrsAccess.push(attr)
				})
				virtual._attrsAction.forEach((attr: any) => {
					this._attrsAction.push(attr)
				})
			}
		}
		return new MethodResult()
	}

	setAttrsType(clazz: any, rawAttrs: any[]) {
		let attrs: any[] = []
		rawAttrs.forEach((attr: RawObjAttrAccess | RawObjAttrAction) => {
			if (!attrs.find((a) => a._obj.id === attr._obj.id)) {
				attrs.push(new clazz(attr))
			}
		})
		return attrs
	}
}
