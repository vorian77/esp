import { InitDb } from '$server/dbGel/init/types.init'

export function initTableColumn(init: InitDb) {
	init.addTrans('tableColumnsBulk', [
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

	init.addTrans('tableColumnsBulk', [
		['CmCsfCohort', 'csf'],
		['CmCsfCohort', 'codeStatus'],
		['CmCsfCohort', 'cohort'],
		['CmCsfCohort', 'dateCreated'],
		['CmCsfCohort', 'dateEnd'],
		['CmCsfCohort', 'dateEndEst'],
		['CmCsfCohort', 'dateStart'],
		['CmCsfCohort', 'dateStartEst'],
		['CmCsfCohort', 'note']
	])

	init.addTrans('tableColumnsBulk', [
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

	init.addTrans('tableColumnsBulk', [
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

	init.addTrans('tableColumnsBulk', [
		['SysUser', 'avatar'],
		['SysUser', 'id'],
		['SysUser', 'createdAt'],
		['SysUser', 'createdBy'],
		['SysUser', 'modifiedAt'],
		['SysUser', 'modifiedBy'],
		['SysUser', 'name']
	])
}
