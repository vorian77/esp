import { ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addMigration } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initMigrationPerson() {
	sectionHeader('Migration - SysPerson')
	await initReset()
	await initMigration()
}

async function initReset() {
	sectionHeader('Reset')
	const reset = new ResetDb()
	reset.delTableRecords('sys_migr::SysMigr')
	await reset.execute()
}

async function initMigration() {
	await addMigration({
		name: 'migr_extend_SysPerson_with_SysObj',
		description: `Migrate SysPerson (and it's downstream data) to a new SysPerson that extends by SysObj.`,
		owner: 'app_sys',
		sourceTables: [
			{
				name: 'SysPerson',
				codeMigrSourceType: 'select',
				exprSelect: 'SELECT sys_core::SysPerson { id, firstName, lastName }',
				columns: [
					{
						name: 'id',
						codeDataType: 'uuid'
					},
					{
						name: 'firstName',
						codeDataType: 'str'
					},
					{
						name: 'lastName',
						codeDataType: 'str'
					}
				]
			}
		],
		targetTables: [
			{
				isInitTable: true,
				order: 0,
				name: 'SysPerson',
				columns: [
					// {
					// 	column: 'addr1',
					// 	expr: 'copy',
					// 	order: 10
					// },
					// {
					// 	column: 'addr2',
					// 	expr: 'copy',
					// 	order: 20
					// },
					// {
					// 	column: 'avatar',
					// 	expr: 'copy',
					// 	order: 30
					// },
					// {
					// 	column: 'birthDate',
					// 	expr: 'copy',
					// 	order: 40
					// },
					// {
					// 	column: 'city',
					// 	expr: 'copy',
					// 	order: 50
					// },
					// {
					// 	column: 'codeEthnicity',
					// 	expr: 'copy',
					// 	order: 60
					// },
					// {
					// 	column: 'codeGender',
					// 	expr: 'copy',
					// 	order: 70
					// },
					// {
					// 	column: 'codeRace',
					// 	expr: 'copy',
					// 	order: 80
					// },
					// {
					// 	column: 'codeState',
					// 	expr: 'copy',
					// 	order: 90
					// },
					// {
					// 	column: 'email',
					// 	expr: 'copy',
					// 	order: 100
					// },
					// {
					// 	column: 'favFood',
					// 	expr: 'copy',
					// 	order: 110
					// },
					{
						column: 'firstName',
						expr: '<source,SysPerson,firstName>',
						order: 120
					},
					{
						column: 'lastName',
						expr: '<source,SysPerson,lastName>',
						order: 130
					}
					// {
					// 	column: 'middleName',
					// 	expr: 'copy',
					// 	order: 140
					// },
					// {
					// 	column: 'note',
					// 	expr: 'copy',
					// 	order: 150
					// },
					// {
					// 	column: 'phoneAlt',
					// 	expr: 'copy',
					// 	order: 160
					// },
					// {
					// 	column: 'phoneMobile',
					// 	expr: 'copy',
					// 	order: 170
					// },
					// {
					// 	column: 'title',
					// 	expr: 'copy',
					// 	order: 180
					// },
					// {
					// 	column: 'zip',
					// 	expr: 'copy',
					// 	order: 190
					// }
				]
			}
		]
	})
}
