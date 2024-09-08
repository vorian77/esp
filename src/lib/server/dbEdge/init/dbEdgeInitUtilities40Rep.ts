import { createClient } from 'edgedb'
import e, { is } from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities10'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function addAnalytic(data: any) {
	sectionHeader(`addAnalytic - ${data.name}`)
	const query = e.params(
		{
			description: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			owner: e.str,
			parms: e.optional(e.array(e.json)),
			statuses: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_rep.SysAnalytic, {
				createdBy: e.select(e.sys_user.getRootUser()),
				description: p.description,
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parms: e.for(e.array_unpack(p.parms), (p) => {
					return e.insert(e.sys_rep.SysRepParm, {
						codeDataType: e.sys_core.getCode(
							'ct_db_col_data_type',
							e.cast(e.str, e.json_get(p, 'codeDataType'))
						),
						codeFieldElement: e.sys_core.getCode(
							'ct_sys_do_field_element',
							e.cast(e.str, e.json_get(p, 'codeFieldElement'))
						),
						createdBy: e.select(e.sys_user.getRootUser()),
						description: e.cast(e.str, e.json_get(p, 'description')),
						fieldListItems: e.select(
							e.sys_core.getDataObjFieldListItems(e.cast(e.str, e.json_get(p, 'fieldListItems')))
						),
						fieldListItemsParmName: e.cast(e.str, e.json_get(p, 'fieldListItemsParmName')),
						header: e.cast(e.str, e.json_get(p, 'header')),
						isMultiSelect: e.cast(e.bool, e.json_get(p, 'isMultiSelect')),
						isRequired: e.cast(e.bool, e.json_get(p, 'isRequired')),
						linkTable: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(p, 'linkTable')))),
						modifiedBy: e.select(e.sys_user.getRootUser()),
						name: e.cast(e.str, e.json_get(p, 'name')),
						orderDefine: e.cast(e.int16, e.json_get(p, 'orderDefine'))
					})
				}),
				statuses: e.for(e.array_unpack(p.statuses), (s) => {
					return e.insert(e.sys_rep.SysAnalyticStatus, {
						codeStatus: e.select(
							e.sys_core.getCode(
								'ct_sys_rep_analytic_status',
								e.cast(e.str, e.json_get(s, 'codeStatus'))
							)
						),
						comment: e.cast(e.str, e.json_get(s, 'comment')),
						createdBy: e.select(e.sys_user.getRootUser()),
						expr: e.cast(e.str, e.json_get(s, 'expr')),
						modifiedBy: e.select(e.sys_user.getRootUser())
					})
				})
			})
		}
	)
	return await query.run(client, data)
}

export async function addReport(data: any) {
	sectionHeader(`addReport - ${data.name}`)
	const query = e.params(
		{
			actionFieldGroup: e.str,
			analytics: e.optional(e.array(e.str)),
			description: e.optional(e.str),
			elements: e.optional(e.array(e.json)),
			exprFilter: e.optional(e.str),
			exprObject: e.optional(e.str),
			exprSort: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			owner: e.str,
			parms: e.optional(e.array(e.json)),
			tables: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_rep.SysRep, {
				actionFieldGroup: e.select(e.sys_core.getDataObjActionFieldGroup(p.actionFieldGroup)),
				analytics: e.assert_distinct(
					e.set(
						e.for(e.array_unpack(p.analytics), (a) => {
							return e.select(e.sys_rep.getAnalytic(a))
						})
					)
				),
				createdBy: e.select(e.sys_user.getRootUser()),
				description: p.description,
				elements: e.for(e.array_unpack(p.elements), (el) => {
					return e.insert(e.sys_rep.SysRepEl, {
						codeAlignment: e.sys_core.getCode(
							'ct_db_col_alignment',
							e.cast(e.str, e.json_get(el, 'codeAlignment'))
						),
						codeDataType: e.sys_core.getCode(
							'ct_db_col_data_type',
							e.cast(e.str, e.json_get(el, 'codeDataType'))
						),
						codeDbDataSourceValue: e.sys_core.getCode(
							'ct_sys_do_field_source_value',
							e.cast(e.str, e.json_get(el, 'codeDbDataSourceValue'))
						),
						codeFieldElement: e.sys_core.getCode(
							'ct_sys_do_field_element',
							e.cast(e.str, e.json_get(el, 'codeFieldElement'))
						),
						codeReportElementType: e.select(
							e.sys_core.getCode(
								'ct_sys_rep_element_type',
								e.cast(e.str, e.json_get(el, 'codeReportElementType'))
							)
						),
						codeSortDir: e.sys_core.getCode(
							'ct_sys_do_field_sort_dir',
							e.cast(e.str, e.json_get(el, 'codeSortDir'))
						),
						column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(el, 'columnName')))),
						createdBy: e.select(e.sys_user.getRootUser()),
						description: e.cast(e.str, e.json_get(el, 'description')),
						exprCustom: e.cast(e.str, e.json_get(el, 'exprCustom')),
						header: e.cast(e.str, e.json_get(el, 'header')),
						indexTable: e.cast(e.int16, e.json_get(el, 'indexTable')),
						isDisplay: e.cast(e.bool, e.json_get(el, 'isDisplay')),
						isDisplayable: e.cast(e.bool, e.json_get(el, 'isDisplayable')),
						modifiedBy: e.select(e.sys_user.getRootUser()),
						nameCustom: e.cast(e.str, e.json_get(el, 'nameCustom')),
						orderDefine: e.cast(e.int16, e.json_get(el, 'orderDefine')),
						orderDisplay: e.cast(e.int16, e.json_get(el, 'orderDisplay')),
						orderSort: e.cast(e.int16, e.json_get(el, 'orderSort'))
					})
				}),
				exprFilter: p.exprFilter,
				exprObject: p.exprObject,
				exprSort: p.exprSort,
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parms: e.for(e.array_unpack(p.parms), (p) => {
					return e.insert(e.sys_rep.SysRepParm, {
						codeDataType: e.sys_core.getCode(
							'ct_db_col_data_type',
							e.cast(e.str, e.json_get(p, 'codeDataType'))
						),
						codeFieldElement: e.sys_core.getCode(
							'ct_sys_do_field_element',
							e.cast(e.str, e.json_get(p, 'codeFieldElement'))
						),
						createdBy: e.select(e.sys_user.getRootUser()),
						description: e.cast(e.str, e.json_get(p, 'description')),
						fieldListItems: e.select(
							e.sys_core.getDataObjFieldListItems(e.cast(e.str, e.json_get(p, 'fieldListItems')))
						),
						fieldListItemsParmName: e.cast(e.str, e.json_get(p, 'fieldListItemsParmName')),
						header: e.cast(e.str, e.json_get(p, 'header')),
						isMultiSelect: e.cast(e.bool, e.json_get(p, 'isMultiSelect')),
						isRequired: e.cast(e.bool, e.json_get(p, 'isRequired')),
						linkTable: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(p, 'linkTable')))),
						modifiedBy: e.select(e.sys_user.getRootUser()),
						name: e.cast(e.str, e.json_get(p, 'name')),
						orderDefine: e.cast(e.int16, e.json_get(p, 'orderDefine'))
					})
				}),
				tables: e.for(e.array_unpack(p.tables), (t) => {
					return e.insert(e.sys_core.SysDataObjTable, {
						columnParent: e.select(
							e.sys_db.getColumn(e.cast(e.str, e.json_get(t, 'columnParent')))
						),
						createdBy: e.select(e.sys_user.getRootUser()),
						index: e.cast(e.int16, e.json_get(t, 'index')),
						indexParent: e.cast(e.int16, e.json_get(t, 'indexParent')),
						modifiedBy: e.select(e.sys_user.getRootUser()),
						table: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(t, 'table'))))
					})
				})
			})
		}
	)
	return await query.run(client, data)
}

export async function addReportUser(data: any) {
	sectionHeader(`addReportUser - ${data.report} - ${data.user}`)
	const query = e.params(
		{
			header: e.str,
			report: e.str,
			user: e.str
		},
		(p) => {
			return e.insert(e.sys_rep.SysRepUser, {
				createdBy: e.select(e.sys_user.getRootUser()),
				headerUser: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				orderDefine: 10,
				report: e.select(e.sys_rep.getReport(p.report)),
				user: e.select(e.sys_user.getUserByName(p.user))
			})
		}
	)
	return await query.run(client, data)
}
