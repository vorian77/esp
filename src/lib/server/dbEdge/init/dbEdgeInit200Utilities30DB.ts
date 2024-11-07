import e from '$lib/dbschema/edgeql-js'
import {
	client,
	booleanOrDefaultJSON,
	booleanOrDefaultParm,
	sectionHeader
} from '$routes/api/dbEdge/dbEdge'

export async function addColumn(data: any) {
	sectionHeader(`addColumn - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			classProps: e.optional(e.str),
			codeAlignment: e.optional(e.str),
			codeDataType: e.str,
			exprSelect: e.optional(e.str),
			exprStorageKey: e.optional(e.str),
			header: e.str,
			headerSide: e.optional(e.str),
			isExcludeInsert: e.optional(e.bool),
			isExcludeSelect: e.optional(e.bool),
			isExcludeUpdate: e.optional(e.bool),
			isMultiSelect: e.optional(e.bool),
			isNonData: e.optional(e.bool),
			isSelfReference: e.optional(e.bool),
			matchColumn: e.optional(e.str),
			maxLength: e.optional(e.int16),
			maxValue: e.optional(e.float64),
			minLength: e.optional(e.int16),
			minValue: e.optional(e.float64),
			name: e.str,
			owner: e.str,
			pattern: e.optional(e.str),
			patternMsg: e.optional(e.str),
			patternReplacement: e.optional(e.str),
			placeHolder: e.optional(e.str),
			spinStep: e.optional(e.str),
			togglePresetTrue: e.optional(e.bool),
			toggleValueFalse: e.optional(e.str),
			toggleValueShow: e.optional(e.bool),
			toggleValueTrue: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_db.SysColumn, {
				owner: e.sys_core.getSystemPrime(p.owner),
				classProps: p.classProps,
				codeAlignment: e.select(
					e.sys_core.getCode(
						'ct_db_col_alignment',
						e.op(p.codeAlignment, 'if', e.op('exists', p.codeAlignment), 'else', 'left')
					)
				),
				codeDataType: e.sys_core.getCode('ct_db_col_data_type', p.codeDataType),
				createdBy: CREATOR,
				exprStorageKey: p.exprStorageKey,
				header: p.header,
				headerSide: p.headerSide,
				isExcludeInsert: booleanOrDefaultParm(p.isExcludeInsert, false),
				isExcludeSelect: booleanOrDefaultParm(p.isExcludeSelect, false),
				isExcludeUpdate: booleanOrDefaultParm(p.isExcludeUpdate, false),
				isMultiSelect: booleanOrDefaultParm(p.isMultiSelect, false),
				isNonData: booleanOrDefaultParm(p.isNonData, false),
				isSelfReference: booleanOrDefaultParm(p.isSelfReference, false),
				matchColumn: p.matchColumn,
				maxLength: p.maxLength,
				maxValue: p.maxValue,
				minLength: p.minLength,
				minValue: p.minValue,
				modifiedBy: CREATOR,
				name: p.name,
				pattern: p.pattern,
				patternMsg: p.patternMsg,
				patternReplacement: p.patternReplacement,
				placeHolder: p.placeHolder,
				spinStep: p.spinStep,
				togglePresetTrue: p.togglePresetTrue,
				toggleValueFalse: p.toggleValueFalse,
				toggleValueShow: p.toggleValueShow,
				toggleValueTrue: p.toggleValueTrue
			})
		}
	)
	return await query.run(client, data)
}

export async function tableColumnsBulk(data: any) {
	sectionHeader('Table Columns')
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_db.SysTable, (t) => ({
				filter: e.op(t.name, '=', e.cast(e.str, i[0])),
				set: {
					columns: { '+=': e.select(e.sys_db.getColumn(e.cast(e.str, i[1]))) }
				}
			}))
		})
	})
	return await query.run(client, { data })
}
