import { State } from '$comps/app/types.appState'
import { ParmsValues } from '$utils/types'
import {
	arrayOfClasses,
	arrayOfEnums,
	booleanRequired,
	getArray,
	memberOfEnum,
	nbrOptional,
	nbrRequired,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import { DataObj, ParmsValuesType } from '$utils/types'
import { RawDataObjUserResourceSaveParmsSelect } from '$comps/dataObj/types.rawDataObj'
import { TokenAppModalReturnType, TokenAppModalSelect } from '$utils/types.token'
import { FieldItem } from '$comps/form/field'
import { FileStorage } from '$comps/form/fieldFile'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/utils.user.ts'

export class User {
	avatar?: FileStorage
	firstName: string
	fullName: string = ''
	id: string
	initials: string = ''
	lastName: string
	org: { name: string; header: string } | undefined
	preferences: any[] = []
	resource_apps: any[] = []
	resource_footer: any[] = []
	resource_programs: any[] = []
	resource_widgets: any[] = []
	resources: UserTypeResource[] = []
	systemIds: string[] = []
	userName: string

	// old
	cm_ssr_disclosure: number | undefined
	per_name_full: string = ''
	site: string = ''
	status: string = ''
	user_id: number | undefined

	constructor(obj: any) {
		// console.log('User.constructor.resource_apps: ', obj.resource_apps)
		const clazz = 'User'
		this.avatar = obj.avatar
		this.firstName = strRequired(obj.firstName, clazz, 'firstName')
		this.fullName = strRequired(obj.fullName, clazz, 'fullName')
		this.id = strRequired(obj.id, clazz, 'id')
		this.lastName = strRequired(obj.lastName, clazz, 'lastName')
		this.org = obj.org ? { name: obj.org.name, header: obj.org.header } : undefined
		this.preferences = obj.preferences
		this.resource_apps = obj.resource_apps
		this.resource_footer = obj.resource_footer
		this.resource_programs = obj.resource_programs
		this.resource_widgets = obj.resource_widgets
		this.resources = arrayOfClasses(UserTypeResource, obj.resources)
		this.userName = strRequired(obj.userName, clazz, 'userName')

		// derived
		this.initials = this.firstName.toUpperCase()[0] + this.lastName.toUpperCase()[0]
		this.setResourcesSystems(obj.resourcesSystem)
		// console.log('User.constructor.resources', this.resources)

		// old
		// this.cm_ssr_disclosure = nbrOptional(obj.cm_ssr_disclosure, 'cm_ssr_disclosure')
		// this.per_name_full = strRequired(obj.per_name_full, 'User', 'per_name_full')
		// this.site = strRequired(obj.site, 'User', 'site')
		// this.status = strRequired(obj.status, 'User', 'status')
		// this.user_id = nbrOptional(obj.user_id, 'User')
	}

	getResources(codeResourceType: UserTypeResourceType): UserTypeResource[] {
		return this.resources.filter((r) => r.codeType === codeResourceType) || []
	}

	async setUserSelectParms(state: State, dataObj: DataObj, parmData: ParmsValues) {
		// for (let i = 0; i < dataObj.raw.userResourceSaveParmsSelect.length; i++) {
		// 	const parmItem = dataObj.raw.userResourceSaveParmsSelect[i]
		// 	if (!(await this.setUserSelectParmsItem(state, parmItem, parmData))) return false
		// }

		for await (const parmItem of dataObj.raw.userResourceSaveParmsSelect) {
			const result = await this.setUserSelectParmsItem(state, parmItem, parmData)
			if (!result) return false
		}
		return true
	}
	async setUserSelectParmsItem(
		state: State,
		parmItem: RawDataObjUserResourceSaveParmsSelect,
		parmData: ParmsValues
	) {
		const codeResourceType =
			parmItem.codeType === UserTypeResourceType.subject ? parmItem.subject : parmItem.codeType
		const parmName = `user_resource_${codeResourceType}`
		const resources = this.getResources(codeResourceType)
		switch (resources.length) {
			case 0:
				alert(`Cannnot proceed. You do not have access to resource type: ${codeResourceType}`)
				return false
			case 1:
				parmData.data[parmName] = resources[0].idResource
				return true
				break
			default:
				const itemsList = resources.map((r) => {
					return new FieldItem(r.idResource, r.header)
				})
				parmData.data[parmName] = resources[0].idResource
				return true
				console.log('User.setUserSelectParms.parmSelect.multi', { parmName, resources, itemsList })
				await state.openModalSelect(
					new TokenAppModalSelect({
						fieldLabel: `System Record`,
						fModalClose: (returnType: TokenAppModalReturnType, returnData?: ParmsValues) => {
							if (returnType === TokenAppModalReturnType.complete) {
								const parms: ParmsValues = returnData.data || undefined
								if (parms) {
									const selectedIds = parms[ParmsValuesType.listRecordIdSelected]
									console.log('User.setUserSelectParms.fModalClose', {
										returnData: returnData.data,
										selectedIds
									})

									// parmData.data[parmName] = resources[0].idResource
								}
								return false
							} else {
								return false
							}
						},
						isMultiSelect: false,
						itemsCurrent: [],
						itemsList: resources.map((r) => {
							return new FieldItem(r.idResource, r.header)
						})
					})
				)
				parmData.data[parmName] = resources[0].idResource
				return true
		}
	}

	setName() {
		this.fullName = `${this.firstName} ${this.lastName}`
	}

	setResourcesSystems(obj: any) {
		const systems = getArray(obj)
		systems.forEach((sys: { header: string; id: string; name: string }) => {
			this.resources.push(
				new UserTypeResource({
					_codeType: UserTypeResourceType.system,
					_resource: { header: sys.header, id: sys.id, name: sys.name }
				})
			)
			this.systemIds.push(sys.id)
		})
	}
}

export enum UserPrefType {
	notifications_auto_retrieve = 'notifications_auto_retrieve',
	remember_list_settings = 'remember_list_settings'
}

export class UserTypeResource {
	codeType: UserTypeResourceType
	header?: string
	idResource: string
	idSubject?: string
	name: string
	constructor(obj: any) {
		const clazz = 'UserTypeResourceItem'
		this.codeType = memberOfEnum(
			obj._codeType,
			clazz,
			'codeType',
			'UserTypeResourceType',
			UserTypeResourceType
		)
		this.header = obj._resource.header
		this.idResource = strRequired(obj._resource.id, clazz, 'idResource')
		this.idSubject =
			this.codeType === UserTypeResourceType.subject
				? strRequired(obj.idSubject, clazz, 'idSubject')
				: undefined
		this.name = strRequired(obj._resource.name, clazz, 'name')
	}
}

export enum UserTypeResourceType {
	'app' = 'app',
	'intervention' = 'intervention',
	'report' = 'report',
	'subject' = 'subject',
	'system' = 'system',
	'widget' = 'widget'
}
