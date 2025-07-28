import e from '$db/gel/edgeql-js'
import { client, sectionHeader } from '$routes/api/db/dbGel/dbGel'

export async function addAnalytic(data: any) {
	sectionHeader(`addAnalytic - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			description: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			ownerSys: e.str,
			parms: e.optional(e.array(e.json)),
			statuses: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_rep.SysAnalytic, {
				createdBy: CREATOR,
				description: p.description,
				header: p.header,
				modifiedBy: CREATOR,
				name: p.name,
				ownerSys: e.sys_core.getSystemPrime(p.ownerSys),
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
						createdBy: CREATOR,
						description: e.cast(e.str, e.json_get(p, 'description')),
						exprFilter: e.cast(e.str, e.json_get(p, 'exprFilter')),
						fieldListItems: e.select(
							e.sys_core.getDataObjFieldListItems(e.cast(e.str, e.json_get(p, 'fieldListItems')))
						),
						fieldListItemsParmValue: e.cast(e.str, e.json_get(p, 'fieldListItemsParmValue')),
						header: e.cast(e.str, e.json_get(p, 'header')),
						isMultiSelect: e.cast(e.bool, e.json_get(p, 'isMultiSelect')),
						isRequired: e.cast(e.bool, e.json_get(p, 'isRequired')),
						modifiedBy: CREATOR,
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
						createdBy: CREATOR,
						expr: e.cast(e.str, e.json_get(s, 'expr')),
						modifiedBy: CREATOR
					})
				})
			})
		}
	)
	return await query.run(client, data)
}

export async function addReport(data: any) {
	sectionHeader(`addReport - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			actionGroup: e.str,
			description: e.optional(e.str),
			elements: e.optional(e.array(e.json)),
			exprFilter: e.optional(e.str),
			exprSort: e.optional(e.str),
			exprWith: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			ownerSys: e.str,
			parms: e.optional(e.array(e.json)),
			tables: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_rep.SysRep, {
				actionGroup: e.select(e.sys_core.getDataObjActionGroup(p.actionGroup)),
				createdBy: CREATOR,
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
						codeDbDataSourceValue: e.op(
							e.sys_core.getCode(
								'ct_sys_do_field_source_value',
								e.cast(e.str, e.json_get(el, 'codeDbDataSourceValue'))
							),
							'if',
							e.op('exists', e.cast(e.str, e.json_get(el, 'codeDbDataSourceValue'))),
							'else',
							e.sys_core.getCode('ct_sys_do_field_source_value', 'edgeDB')
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
						createdBy: CREATOR,
						description: e.cast(e.str, e.json_get(el, 'description')),
						exprCustom: e.cast(e.str, e.json_get(el, 'exprCustom')),
						header: e.cast(e.str, e.json_get(el, 'header')),
						indexTable: e.cast(e.int16, e.json_get(el, 'indexTable')),
						isDisplay: e.cast(e.bool, e.json_get(el, 'isDisplay')),
						isDisplayable: e.cast(e.bool, e.json_get(el, 'isDisplayable')),
						linkColumns: e.for(
							e.enumerate(e.array_unpack(e.cast(e.array(e.str), e.json_get(el, 'linkColumns')))),
							(c) => {
								return e.insert(e.sys_core.SysDataObjColumnLink, {
									column: e.select(e.sys_db.getColumn(c[1])),
									orderDefine: c[0],
									createdBy: CREATOR,
									modifiedBy: CREATOR
								})
							}
						),
						modifiedBy: CREATOR,
						nameCustom: e.cast(e.str, e.json_get(el, 'nameCustom')),
						orderDefine: e.cast(e.int16, e.json_get(el, 'orderDefine')),
						orderDisplay: e.cast(e.int16, e.json_get(el, 'orderDisplay')),
						orderSort: e.cast(e.int16, e.json_get(el, 'orderSort'))
					})
				}),
				exprFilter: p.exprFilter,
				exprSort: p.exprSort,
				exprWith: p.exprWith,
				header: p.header,
				modifiedBy: CREATOR,
				name: p.name,
				ownerSys: e.sys_core.getSystemPrime(p.ownerSys),
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
						createdBy: CREATOR,
						description: e.cast(e.str, e.json_get(p, 'description')),
						exprFilter: e.cast(e.str, e.json_get(p, 'exprFilter')),
						fieldListItems: e.select(
							e.sys_core.getDataObjFieldListItems(e.cast(e.str, e.json_get(p, 'fieldListItems')))
						),
						fieldListItemsParmValue: e.cast(e.str, e.json_get(p, 'fieldListItemsParmValue')),
						header: e.cast(e.str, e.json_get(p, 'header')),
						isMultiSelect: e.cast(e.bool, e.json_get(p, 'isMultiSelect')),
						isRequired: e.cast(e.bool, e.json_get(p, 'isRequired')),
						modifiedBy: CREATOR,
						name: e.cast(e.str, e.json_get(p, 'name')),
						orderDefine: e.cast(e.int16, e.json_get(p, 'orderDefine'))
					})
				}),
				tables: e.for(e.array_unpack(p.tables), (t) => {
					return e.insert(e.sys_core.SysDataObjTable, {
						columnParent: e.select(
							e.sys_db.getColumn(e.cast(e.str, e.json_get(t, 'columnParent')))
						),
						createdBy: CREATOR,
						index: e.cast(e.int16, e.json_get(t, 'index')),
						indexParent: e.cast(e.int16, e.json_get(t, 'indexParent')),
						modifiedBy: CREATOR,
						table: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(t, 'table'))))
					})
				})
			})
		}
	)
	return await query.run(client, data)
}
