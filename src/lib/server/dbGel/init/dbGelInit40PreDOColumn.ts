import { InitDb } from '$server/dbGel/init/types.init'

export function initPreColumn(init: InitDb) {
	// temp
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 't.Bool',
		name: 'testBool'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 't.CodeMultiple',
		isMultiSelect: true,
		name: 'testCodeMulti'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 't.CodeSingle',
		name: 'testCodeSingle'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'center',
		codeDataType: 'date',
		header: 't.Date',
		inputMask: 'date',
		name: 'testDate'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'float64',
		header: 't.NbrFloat',
		name: 'testNumberFloat'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'int64',
		header: 't.NbrInt',
		name: 'testNumberInt'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 't.Text',
		name: 'testText'
	})

	// real
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Action',
		isMultiSelect: false,
		name: 'action',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Action - Confirms',
		isMultiSelect: true,
		name: 'actionConfirms',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Action Post',
		isMultiSelect: false,
		name: 'actionPost',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Action - Submits',
		isMultiSelect: true,
		name: 'actionSubmits',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Actions - Field',
		isMultiSelect: true,
		name: 'actionsField',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Action Field Group',
		isMultiSelect: false,
		name: 'actionGroup',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Action Group Modal',
		isMultiSelect: false,
		name: 'actionGroupModal',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Actions - Query',
		isMultiSelect: true,
		name: 'actionsQuery',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Address 1',
		name: 'addr1'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Address 2',
		name: 'addr2'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Agency ID',
		name: 'agencyId',
		owner: 'sys_client_atlantic_impact',
		placeHolder: 'Enter agency ID'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Analytic',
		isMultiSelect: false,
		name: 'analytic'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Analytics',
		isMultiSelect: true,
		name: 'analytics'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Applicant',
		isMultiSelect: false,
		name: 'applicant'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Application Header',
		isMultiSelect: false,
		name: 'appHeader',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Application Name',
		name: 'appName'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Attendance Records',
		isMultiSelect: true,
		name: 'attds',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Attributes Access',
		isMultiSelect: true,
		name: 'attrsAccess',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Attributes Action',
		isMultiSelect: true,
		name: 'attrsAction',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Attribute Expressions',
		isMultiSelect: true,
		name: 'attrsExpr',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Virtual Attributes',
		isMultiSelect: true,
		name: 'attrsVirtual',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'json',
		exprStorageKey: 'avatar_<function,fSysRandom10>',
		header: 'Avatar',
		name: 'avatar'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int64',
		header: 'Security Code',
		name: 'securityCodeUser',
		pattern: '^\\d{6}$',
		patternMsg: 'Security Code should be exactly 6 digits.'
	})
	init.addTrans('sysColumn', {
		codeAlignment: 'center',
		codeDataType: 'date',
		header: 'Birth Date',
		inputMask: 'date',
		name: 'birthDate',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Complete Button Label',
		name: 'btnLabelComplete'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'City',
		name: 'city'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Class Props',
		name: 'classProps'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Client',
		isMultiSelect: false,
		name: 'client',
		owner: 'sys_client_atlantic_impact'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_client_atlantic_impact',
		codeDataType: 'link',
		header: 'Group',
		isMultiSelect: false,
		name: 'cmGroup'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		isMultiSelect: false,
		header: 'Access',
		name: 'codeAccess'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Code Action',
		isMultiSelect: false,
		name: 'codeAction',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Alignment',
		isMultiSelect: false,
		name: 'codeAlignment'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Alignment (Alt)',
		isMultiSelect: false,
		name: 'codeAlignmentAlt'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Attribute Type',
		isMultiSelect: false,
		name: 'codeAttrType'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Attribute Type Access',
		isMultiSelect: false,
		name: 'codeAttrTypeAccess'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Attribute Type Action',
		isMultiSelect: false,
		name: 'codeAttrTypeAction'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Cardinality',
		isMultiSelect: false,
		name: 'codeCardinality',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Duration',
		isMultiSelect: false,
		name: 'codeCmCohortAttdDuration',
		owner: 'sys_client_atlantic_impact'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'College Status',
		isMultiSelect: false,
		name: 'codeCollegeStatus',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Color',
		isMultiSelect: false,
		name: 'codeColor'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Component',
		isMultiSelect: false,
		name: 'codeComponent',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Confirm Type',
		isMultiSelect: false,
		name: 'codeConfirmType',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Data Object Type',
		isMultiSelect: false,
		name: 'codeDataObjType',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Data Type',
		isMultiSelect: false,
		name: 'codeDataType'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Data Type - Display',
		isMultiSelect: false,
		name: 'codeDataTypeDisplay'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Data Source - Value',
		isMultiSelect: false,
		name: 'codeDbDataSourceValue'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Disability Status',
		isMultiSelect: false,
		name: 'codeDisabilityStatus',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Field Element',
		isMultiSelect: false,
		name: 'codeFieldElement'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Ethnicity',
		isMultiSelect: false,
		name: 'codeEthnicity',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Gender',
		isMultiSelect: false,
		name: 'codeGender',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Group Enrollment',
		isMultiSelect: false,
		name: 'codeGroupEnrollment',
		owner: 'sys_client_atlantic_impact'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Group Type',
		isMultiSelect: false,
		name: 'codeGroupType',
		owner: 'sys_client_atlantic_impact'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_client_atlantic_impact',
		codeDataType: 'link',
		header: 'Highest Education',
		isMultiSelect: false,
		name: 'codeHighestEducation'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Icon',
		isMultiSelect: false,
		name: 'codeIcon'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Job Type',
		isMultiSelect: false,
		name: 'codeJobType'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'List - Edit - Preset Type',
		isMultiSelect: false,
		name: 'codeListPresetType'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Mask',
		isMultiSelect: false,
		name: 'codeMask'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Source Type',
		isMultiSelect: false,
		name: 'codeMigrSourceType'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Node Type',
		isMultiSelect: false,
		name: 'codeNodeType',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Notify Type',
		isMultiSelect: false,
		name: 'codeNotifyType',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Object Type',
		isMultiSelect: false,
		name: 'codeObjType',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Living Arrangements',
		isMultiSelect: false,
		name: 'codePersonLivingArrangements',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Placement Related To Training',
		isMultiSelect: false,
		name: 'codePlacementRelated'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Query Function',
		isMultiSelect: false,
		name: 'codeQueryFunction'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Query Owner Type',
		isMultiSelect: false,
		name: 'codeQueryOwnerType',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Query Type',
		isMultiSelect: false,
		name: 'codeQueryType',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Race',
		isMultiSelect: false,
		name: 'codeRace',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Report Element Type',
		isMultiSelect: false,
		name: 'codeReportElementType'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_client_atlantic_impact',
		codeDataType: 'link',
		header: 'Retention',
		isMultiSelect: false,
		name: 'codeRetention'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Sector',
		isMultiSelect: false,
		name: 'codeSector'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Eligibility Status',
		isMultiSelect: false,
		name: 'codeSfEligibilityStatus',
		owner: 'sys_app_cm'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Enrollment Type',
		isMultiSelect: false,
		name: 'codeSfEnrollType',
		owner: 'sys_app_cm'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Outcome',
		isMultiSelect: false,
		name: 'codeSfOutcome',
		owner: 'sys_app_cm'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'List Direction',
		isMultiSelect: false,
		name: 'codeSortDir'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'State',
		isMultiSelect: false,
		name: 'codeState',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Status',
		isMultiSelect: false,
		name: 'codeStatus',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Status Object',
		name: 'codeTaskStatusObj',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Trigger - Conditional Confirm',
		isMultiSelect: false,
		name: 'codeTriggerConfirmConditional',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Trigger - Show',
		isMultiSelect: false,
		name: 'codeTriggerShow',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Trigger - Timing',
		isMultiSelect: false,
		name: 'codeTriggerTiming',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Type',
		isMultiSelect: false,
		name: 'codeType',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Code Type Family',
		isMultiSelect: true,
		name: 'codeTypeFamily',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Payment Type',
		isMultiSelect: false,
		name: 'codeTypePayment',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'User Destination',
		isMultiSelect: false,
		name: 'codeUserDestination'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'User Message Delivery',
		isMultiSelect: false,
		name: 'codeUserMsgDelivery'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Tags',
		isMultiSelect: false,
		name: 'codeUserTypeTags'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_client_atlantic_impact',
		codeDataType: 'link',
		header: 'Wage Type',
		isMultiSelect: false,
		name: 'codeWageType'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Cohort',
		isMultiSelect: false,
		name: 'cohort'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Cohort Attendance',
		isMultiSelect: false,
		name: 'cohortAttd'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Attendance Records',
		isMultiSelect: true,
		name: 'cohortAttds'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Cohorts',
		isMultiSelect: true,
		name: 'cohorts'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'College - GPA',
		name: 'collegeGPA'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'int16',
		header: 'College - Grad Year',
		name: 'collegeGradYear'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'College - Major',
		name: 'collegeMajor'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'College - Name',
		name: 'collegeName'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Column',
		isMultiSelect: false,
		name: 'column'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Column - Backlink',
		isMultiSelect: false,
		name: 'columnBacklink'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Parent Column',
		isMultiSelect: false,
		name: 'columnParent',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Columns',
		isMultiSelect: true,
		name: 'columns'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Columns Id',
		isMultiSelect: true,
		name: 'columnsId',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Comment',
		name: 'comment'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Hours (Computed)',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'computedHours'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Confirm',
		isMultiSelect: false,
		name: 'confirm',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Button Label - Cancel',
		name: 'confirmButtonLabelCancel'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Button Label - Confirm',
		name: 'confirmButtonLabelConfirm'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Confirm Message',
		name: 'confirmMessage'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Confirm Title',
		name: 'confirmTitle'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Contact',
		isMultiSelect: false,
		name: 'contact',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Contacts',
		isMultiSelect: true,
		name: 'contacts',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Cost',
		inputMask: 'currency',
		minValue: 0,
		name: 'cost'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Course',
		isMultiSelect: false,
		name: 'course',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Certifications',
		name: 'courseCertifications'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Exams',
		name: 'courseExams'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Items - Included',
		name: 'courseItemsIncluded'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Items - Not Included',
		name: 'courseItemsNotIncluded'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Requirements',
		name: 'courseRequirements'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'datetime',
		header: 'Created At',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'createdAt'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Created By',
		isMultiSelect: false,
		isExcludeUpdate: true,
		name: 'createdBy',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Service Flow',
		isMultiSelect: false,
		name: 'csf'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Cohort',
		isMultiSelect: false,
		name: 'csfCohort'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Attendance Records',
		isMultiSelect: true,
		name: 'csfCohortAttds'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Cohorts',
		isMultiSelect: true,
		name: 'csfCohorts'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'none',
		header: 'custom_details_end',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		isFormTag: true,
		name: 'custom_details_end'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'none',
		header: 'custom_details_start',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		isFormTag: true,
		name: 'custom_details_start'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'custom_element',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		name: 'custom_element'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'custom_element_bool',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_element_bool'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'center',
		codeDataType: 'date',
		header: 'custom_element_date',
		inputMask: 'date',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_element_date'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'custom_element_float',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_element_float'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int64',
		header: 'custom_element_int',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_element_int'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'custom_element_link',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		isMultiSelect: false,
		name: 'custom_element_link'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'custom_element_str',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_element_str'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'none',
		header: 'custom_embed_shell',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		name: 'custom_embed_shell'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'none',
		header: 'custom_row_end',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		isFormTag: true,
		name: 'custom_row_end'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'none',
		header: 'custom_row_start',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		isFormTag: true,
		name: 'custom_row_start'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'none',
		header: 'custom_section_end',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		isFormTag: true,
		name: 'custom_section_end'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'none',
		header: 'custom_section_start',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		isFormTag: true,
		name: 'custom_section_start'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Action - Value',
		name: 'customColActionValue'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Custom - Align',
		name: 'customColAlign'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'json',
		exprStorageKey: 'file_<function,fSysRandom10>',
		header: 'Custom - File',
		name: 'customColFile'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Custom - Sub-Header',
		name: 'customColIsSubHeader'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Custom - Label',
		name: 'customColLabel'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Custom - Prefix',
		name: 'customColPrefix'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Custom - Raw HTML',
		name: 'customColRawHTML'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Custom - Size',
		name: 'customColSize'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Custom - Source',
		name: 'customColSource'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Custom - Source Key',
		name: 'customColSourceKey'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Custom - Type',
		isMultiSelect: false,
		name: 'customColType',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Embed Shell Fields',
		isMultiSelect: true,
		name: 'customEmbedShellFields'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Data',
		name: 'data'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Data Object',
		isMultiSelect: false,
		name: 'dataObj'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Data Object Actions',
		isMultiSelect: true,
		name: 'dataObjActions',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Data Object - Embed',
		isMultiSelect: false,
		name: 'dataObjEmbed'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Data Object - List',
		isMultiSelect: false,
		name: 'dataObjList'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Data Object - Modal',
		isMultiSelect: false,
		name: 'dataObjModal'
	})
	init.addTrans('sysColumn', {
		codeAlignment: 'center',
		codeDataType: 'date',
		header: 'Date',
		inputMask: 'date',
		name: 'date',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'center',
		codeDataType: 'date',
		inputMask: 'date',
		header: 'Creation Date',
		name: 'dateCreated'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'center',
		codeDataType: 'date',
		header: 'End Date',
		inputMask: 'date',
		name: 'dateEnd'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'center',
		codeDataType: 'date',
		header: 'Estimated End Date',
		inputMask: 'date',
		name: 'dateEndEst'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'center',
		codeDataType: 'date',
		header: 'Expiration Date',
		inputMask: 'date',
		name: 'dateExpires'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'center',
		codeDataType: 'date',
		header: 'Issued Date',
		inputMask: 'date',
		name: 'dateIssued'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'center',
		codeDataType: 'datetime',
		header: 'Date',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'dateMsg'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'center',
		codeDataType: 'date',
		header: 'Start Date',
		inputMask: 'date',
		name: 'dateStart'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'center',
		codeDataType: 'date',
		header: 'Estimated Start Date',
		inputMask: 'date',
		name: 'dateStartEst'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Default System',
		name: 'defaultSystem'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Description',
		name: 'description'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'My Description',
		name: 'descriptionUser'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Display',
		name: 'display'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Display ID Separator',
		name: 'displayIdSeparator'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Element',
		isMultiSelect: false,
		name: 'element'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Elements',
		isMultiSelect: true,
		name: 'elements'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Email',
		name: 'email'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Employer - Contact Email',
		name: 'employerContactEmail',
		owner: 'sys_client_atlantic_impact'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Employer - Contact First Name',
		name: 'employerContactNameFirst',
		owner: 'sys_client_atlantic_impact'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Employer - Contact Last Name',
		name: 'employerContactNameLast',
		owner: 'sys_client_atlantic_impact'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_client_atlantic_impact',
		codeDataType: 'str',
		header: 'Employer - Contact Phone',
		inputMask: 'phone',
		name: 'employerContactPhone'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Employer',
		name: 'employerName',
		owner: 'sys_client_atlantic_impact'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Code',
		name: 'errCode'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'File',
		name: 'errFile'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Function',
		name: 'errFunction'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Message - System',
		name: 'errMsgSystem'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Message - User',
		name: 'errMsgUser'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'int16',
		header: 'Status',
		name: 'errStatus'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression',
		name: 'expr',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - Auto Select',
		name: 'exprAutoSelect',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - Cron',
		name: 'exprCron',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - Custom',
		name: 'exprCustom',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - Data',
		name: 'exprData',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - Filter',
		name: 'exprFilter',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - Filter Update',
		name: 'exprFilterUpdate',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - Preset',
		name: 'exprPreset',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - Save',
		name: 'exprSave',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Expression - Select',
		name: 'exprSelect'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - Show',
		name: 'exprShow',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - Sort',
		name: 'exprSort',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Expression - Status',
		name: 'exprStatus'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Expression - Storage Key',
		name: 'exprStorageKey'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - Trigger',
		name: 'exprTrigger',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Expression - With',
		name: 'exprWith',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Favorite Food',
		isMultiSelect: true,
		name: 'favFood'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Embed Detail',
		isMultiSelect: false,
		name: 'fieldEmbedDetail',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Embed List Config',
		isMultiSelect: false,
		name: 'fieldEmbedListConfig',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Embed List Edit',
		isMultiSelect: false,
		name: 'fieldEmbedListEdit',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Embed List Select',
		isMultiSelect: false,
		name: 'fieldEmbedListSelect',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'List-Items',
		isMultiSelect: false,
		name: 'fieldListItems',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Field List Parm - Name',
		name: 'fieldListItemsParmValue'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'strList',
		header: 'Field List Parm List',
		isMultiSelect: true,
		name: 'fieldListItemsParmValueList'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'json',
		exprStorageKey: 'file_<function,fSysRandom10>',
		header: 'File',
		name: 'file'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'First Name',
		name: 'firstName'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Full Name',
		name: 'fullName'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Gender Self Identity',
		name: 'genderSelfId'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Has Alternate Open',
		name: 'hasAltOpen',
		togglePresetTrue: false
	})
	init.addTrans('sysColumn', {
		owner: 'sys_client_atlantic_impact',
		codeDataType: 'str',
		header: 'Has Drivers License',
		name: 'hasDriversLicense',
		togglePresetTrue: false,
		toggleValueFalse: 'No',
		toggleValueTrue: 'Yes'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Has Management Columns',
		name: 'hasMgmt',
		togglePresetTrue: true
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Header',
		name: 'header'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Header (Alternate)',
		name: 'headerAlt'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Header (Side)',
		name: 'headerSide'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'My Name',
		name: 'headerUser'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Height',
		name: 'height'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Hours',
		maxValue: 24,
		minValue: 0,
		name: 'hours',
		spinStep: '0.25'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Hours Per Week',
		minValue: 0,
		name: 'hoursPerWeek'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Icon',
		name: 'icon'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'uuid',
		header: 'System ID',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'id'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int64',
		header: 'Demo Index',
		name: 'idxDemo'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Index',
		name: 'index'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Parent Index',
		name: 'indexParent'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Table Index',
		name: 'indexTable'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Input Mask',
		name: 'inputMask'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Input Mask (Alternate)',
		name: 'inputMaskAlt'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Active',
		name: 'isActive'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Closed',
		name: 'isClosed'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Always Retrieve Data',
		name: 'isAlwaysRetrieveData'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Display',
		name: 'isDisplay'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Displayable',
		name: 'isDisplayable'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Display Block',
		name: 'isDisplayBlock'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Display ID',
		name: 'isDisplayId'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Exclude-Insert',
		name: 'isExcludeInsert'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Exclude-Select',
		name: 'isExcludeSelect'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Exclude-Update',
		name: 'isExcludeUpdate'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Form Readonly',
		name: 'isFormReadonly'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Form Tag',
		name: 'isFormTag'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Global Resource',
		name: 'isGlobalResource'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Hide Row Manager',
		name: 'isHideRowManager'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Initial Validation Is Silent',
		name: 'isInitialValidationSilent'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Initialize Table',
		name: 'isInitTable'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Legal Agreed',
		name: 'isLegalAgreed',
		toggleContinueRequiresTrue: true
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'List - Edit',
		name: 'isListEdit'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'List Row Action',
		name: 'isListRowAction'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'List - Suppress Filter/Sort',
		name: 'isListSuppressFilterSort'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'List - Suppress Select',
		name: 'isListSuppressSelect'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Multiple Select',
		name: 'isMultiSelect'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Open',
		name: 'isOpen'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Required',
		name: 'isRequired'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Self Reference',
		name: 'isSelfReference'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Self Signup',
		name: 'isSelfSignup'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Share With Student',
		name: 'isShareWithClient'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Is Table Extension',
		name: 'isTableExtension'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Toggle Continue Requires True',
		name: 'toggleContinueRequiresTrue'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Data',
		name: 'itemData'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Display',
		name: 'itemDisplay'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Key',
		name: 'key'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Last Name',
		name: 'lastName'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'json',
		header: 'Link',
		name: 'link'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Link-Columns',
		isMultiSelect: true,
		name: 'linkColumns'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Link-Table',
		isMultiSelect: false,
		name: 'linkTable'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'List - Edit - Preset Expression',
		name: 'listPresetExpr',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'List - Reorder Column',
		name: 'listReorderColumn'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'int16',
		header: 'Logo File Width',
		name: 'logoWidth'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'float64',
		header: 'Logo Margin Right',
		name: 'logoMarginRight'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Match Column',
		name: 'matchColumn'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'int16',
		header: 'Maximum Length',
		name: 'maxLength'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Minimum Length',
		name: 'minLength'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Maximum Value',
		name: 'maxValue'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Middle Name',
		name: 'middleName'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Minimum Value',
		name: 'minValue'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Module',
		name: 'mod'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'datetime',
		header: 'Modified At',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'modifiedAt'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Modified By',
		isMultiSelect: false,
		name: 'modifiedBy',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Message',
		name: 'msg'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Name',
		name: 'name'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Custom Name',
		name: 'nameCustom'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'No Data Message',
		name: 'noDataMsg'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Node Object',
		isMultiSelect: false,
		name: 'nodeObj',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Nodes',
		isMultiSelect: true,
		name: 'nodes',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Configuration Nodes',
		isMultiSelect: true,
		name: 'nodesConfig',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Note',
		name: 'note'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Notes',
		isMultiSelect: true,
		name: 'notes'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Object',
		isMultiSelect: false,
		name: 'obj',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Site',
		isMultiSelect: false,
		name: 'objAttrCmSite',
		owner: 'sys_app_cm'
	})

	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Task Object - Data Object',
		name: 'objectDataObj'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Task Object - Node',
		name: 'objectNodeObj'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Office',
		isMultiSelect: true,
		name: 'office'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Order',
		name: 'order'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Order - Crumb',
		name: 'orderCrumb'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Order - Define',
		name: 'orderDefine'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Order - Display',
		name: 'orderDisplay'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Order - Sort',
		name: 'orderSort'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Owner',
		isMultiSelect: false,
		name: 'owner',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Page',
		name: 'page'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Parent',
		isMultiSelect: false,
		isSelfReference: true,
		name: 'parent'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Parent Column',
		isMultiSelect: false,
		name: 'parentColumn'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Parent - Filter Expression',
		name: 'parentFilterExpr'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Parent Table',
		isMultiSelect: false,
		name: 'parentTable'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Parm',
		isMultiSelect: false,
		name: 'parm'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Parms',
		isMultiSelect: true,
		name: 'parms'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'json',
		header: 'Value',
		name: 'parmValue'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Parm Value (String)',
		isMultiSelect: false,
		name: 'parmValueStr'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Password',
		name: 'password',
		pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$',
		patternMsg:
			'Your password must be at least 8 characters long, and must contain at least 1 uppercase character, at least 1 lowercase character, at least 1 number, and at least 1 special character (@$!%*#?&).'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Pattern',
		name: 'pattern'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Pattern Message',
		name: 'patternMsg'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Pattern Replacement',
		name: 'patternReplacement'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Person',
		isMultiSelect: false,
		name: 'person',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Alternate Phone',
		inputMask: 'phone',
		name: 'phoneAlt'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Mobile Phone',
		inputMask: 'phone',
		name: 'phoneMobile'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Office Phone',
		inputMask: 'phone',
		name: 'phoneOffice'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Placeholder',
		name: 'placeHolder'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Process - Type',
		isMultiSelect: false,
		name: 'processType'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Program',
		isMultiSelect: false,
		name: 'programCm',
		owner: 'sys_client_atlantic_impact'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Props',
		isMultiSelect: true,
		name: 'props'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Query Rider',
		isMultiSelect: true,
		name: 'queryRiders',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Readers',
		isMultiSelect: true,
		name: 'readers'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Recipients',
		isMultiSelect: true,
		name: 'recipients'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Report',
		isMultiSelect: false,
		name: 'report'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Resource',
		isMultiSelect: false,
		name: 'resource'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Resources',
		isMultiSelect: true,
		name: 'resources'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Schedule',
		name: 'schedule'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'School',
		name: 'school'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Select Parm Value',
		name: 'selectParmValue'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Sender',
		isMultiSelect: false,
		name: 'sender'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Spin Step',
		name: 'spinStep'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Social Security Number',
		inputMask: '###-##-####',
		name: 'ssn'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Staff - Instructor',
		isMultiSelect: false,
		name: 'staffInstructor'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Statuses',
		isMultiSelect: true,
		name: 'statuses'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'str',
		header: 'Sub-Header',
		name: 'subHeader',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Subject',
		name: 'subject'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Parent Systems',
		isMultiSelect: true,
		name: 'systemParents',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Systems',
		isMultiSelect: true,
		name: 'systems',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Table',
		isMultiSelect: false,
		name: 'table'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Tables',
		isMultiSelect: true,
		name: 'tables',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Source Tables',
		isMultiSelect: true,
		name: 'tablesSource',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'link',
		header: 'Target Tables',
		isMultiSelect: true,
		name: 'tablesTarget',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'json',
		header: 'Test',
		isMultiSelect: true,
		name: 'test'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Title',
		name: 'title'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_app_cm',
		codeDataType: 'bool',
		header: 'Verified By Case Manager',
		name: 'isVerifiedByCaseManager'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_app_cm',
		codeDataType: 'bool',
		header: 'Verified By Compliance',
		name: 'isVerifiedByCompliance'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'bool',
		header: 'Toggle Preset True',
		name: 'togglePresetTrue'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Toggle Value-False',
		name: 'toggleValueFalse'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Toggle Value-True',
		name: 'toggleValueTrue'
	})
	init.addTrans('sysColumn', {
		codeDataType: 'bool',
		header: 'Toggle Value-Show',
		name: 'toggleValueShow',
		owner: 'sys_system'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Triggers',
		isMultiSelect: true,
		name: 'triggers'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Code Types',
		isMultiSelect: true,
		name: 'typesCodeType'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'User',
		isMultiSelect: false,
		name: 'user'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_client_atlantic_impact',
		codeDataType: 'link',
		header: 'Group Manager',
		isMultiSelect: false,
		name: 'userGroupMgr'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'User Message',
		isMultiSelect: false,
		name: 'userMsg'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'User Type',
		name: 'userType'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'UserTypes',
		isMultiSelect: true,
		name: 'userTypes'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'Users',
		isMultiSelect: true,
		name: 'users'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Value',
		name: 'value'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Value-Decimal',
		name: 'valueDecimal'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int64',
		header: 'Value-Integer',
		name: 'valueInteger'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Value-String',
		name: 'valueString'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'float64',
		inputMask: 'currency',
		header: 'Wage',
		name: 'wage'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Website',
		name: 'website'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Width',
		name: 'width'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'link',
		header: 'With Expressions',
		isMultiSelect: true,
		name: 'withs'
	})
	init.addTrans('sysColumn', {
		owner: 'sys_system',
		codeDataType: 'str',
		header: 'Zip',
		name: 'zip'
	})
}
