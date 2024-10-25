import { sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { tableColumns } from '$server/dbEdge/init/dbEdgeInit200Utilities30DB'

export async function initTableColumn() {
	sectionHeader('TableColumn')

	await tableColumns([
		['CmClient', 'agencyId'],
		['CmClient', 'createdAt'],
		['CmClient', 'createdBy'],
		['CmClient', 'email'],
		['CmClient', 'firstName'],
		['CmClient', 'fullName'],
		['CmClient', 'id'],
		['CmClient', 'lastName'],
		['CmClient', 'modifiedAt'],
		['CmClient', 'modifiedBy'],
		['CmClient', 'note']
	])

	await tableColumns([
		['CmCsfCohort', 'csf'],
		['CmCsfCohort', 'codeStatus'],
		['CmCsfCohort', 'cohort'],
		['CmCsfCohort', 'dateEnd'],
		['CmCsfCohort', 'dateEndEst'],
		['CmCsfCohort', 'dateReferral'],
		['CmCsfCohort', 'dateStart'],
		['CmCsfCohort', 'dateStartEst'],
		['CmCsfCohort', 'note']
	])

	await tableColumns([
		['SysCode', 'codeType'],
		['SysCode', 'createdAt'],
		['SysCode', 'createdBy'],
		['SysCode', 'header'],
		['SysCode', 'id'],
		['SysCode', 'modifiedAt'],
		['SysCode', 'modifiedBy'],
		['SysCode', 'name'],
		['SysCode', 'order'],
		['SysCode', 'parent'],
		['SysCode', 'valueDecimal'],
		['SysCode', 'valueInteger'],
		['SysCode', 'valueString']
	])

	await tableColumns([
		['SysPerson', 'addr1'],
		['SysPerson', 'addr2'],
		['SysPerson', 'avatar'],
		['SysPerson', 'birthDate'],
		['SysPerson', 'city'],
		['SysPerson', 'codeEthnicity'],
		['SysPerson', 'codeGender'],
		['SysPerson', 'codeRace'],
		['SysPerson', 'codeState'],
		['SysPerson', 'email'],
		['SysPerson', 'favFood'],
		['SysPerson', 'firstName'],
		['SysPerson', 'lastName'],
		['SysPerson', 'middleName'],
		['SysPerson', 'note'],
		['SysPerson', 'phoneAlt'],
		['SysPerson', 'phoneMobile'],
		['SysPerson', 'title'],
		['SysPerson', 'zip']
	])

	await tableColumns([
		['SysUser', 'avatar'],
		['SysUser', 'favFood'],
		['SysUser', 'id'],
		['SysUser', 'createdAt'],
		['SysUser', 'createdBy'],
		['SysUser', 'modifiedAt'],
		['SysUser', 'modifiedBy'],
		['SysUser', 'userName']
	])
}
