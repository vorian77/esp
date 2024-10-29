import { sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { addColumn } from '$server/dbEdge/init/dbEdgeInit200Utilities30DB'

export async function initPreColumn() {
	sectionHeader('Column')

	// temp
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 't.Bool',
		name: 'testBool'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 't.CodeMultiple',
		isMultiSelect: true,
		name: 'testCodeMulti'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 't.CodeSingle',
		isMultiSelect: false,
		name: 'testCodeSingle'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 't.Date',
		name: 'testDate'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'float64',
		header: 't.NbrFloat',
		name: 'testNumberFloat'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'int64',
		header: 't.NbrInt',
		name: 'testNumberInt'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 't.Text',
		name: 'testText'
	})

	// real
	await addColumn({
		codeDataType: 'link',
		header: 'Action',
		isMultiSelect: false,
		name: 'action',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Action Field - Confirms',
		isMultiSelect: true,
		name: 'actionFieldConfirms',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Action Field - Items',
		isMultiSelect: true,
		name: 'actionFieldItems',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Action Field - Shows',
		isMultiSelect: true,
		name: 'actionFieldShows',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Action - Submits',
		isMultiSelect: true,
		name: 'actionSubmits',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Actions - Field',
		isMultiSelect: true,
		name: 'actionsField',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Action Field Group',
		isMultiSelect: false,
		name: 'actionFieldGroup',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Action Field Group Modal',
		isMultiSelect: false,
		name: 'actionFieldGroupModal',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Actions - Query',
		isMultiSelect: true,
		name: 'actionsQuery',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Address 1',
		name: 'addr1'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Address 2',
		name: 'addr2'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Agency ID',
		name: 'agencyId',
		owner: 'sys_ai_old',
		placeHolder: 'Enter agency ID'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Analytic',
		isMultiSelect: false,
		name: 'analytic'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Analytics',
		isMultiSelect: true,
		name: 'analytics'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Application Header',
		isMultiSelect: false,
		name: 'appHeader',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Application Name',
		name: 'appName'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Attendance Records',
		isMultiSelect: true,
		name: 'attds',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'json',
		exprStorageKey: 'avatar_<calc,int64,random10>',
		header: 'Avatar',
		name: 'avatar'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int64',
		header: 'Security Code',
		name: 'authSecurityCode',
		pattern: '^\\d{6}$',
		patternMsg: 'Security Code should be exactly 6 digits.'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 'Birth Date',
		name: 'birthDate'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Complete Button Label',
		name: 'btnLabelComplete'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'City',
		name: 'city'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Class Props',
		name: 'classProps'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Client',
		isMultiSelect: false,
		name: 'client',
		owner: 'sys_ai_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		isMultiSelect: false,
		header: 'Access',
		name: 'codeAccess'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Action Field - Trigger Enable',
		isMultiSelect: false,
		name: 'codeActionFieldTriggerEnable',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Alignment',
		isMultiSelect: false,
		name: 'codeAlignment'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Alignment (Alt)',
		isMultiSelect: false,
		name: 'codeAlignmentAlt'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Cardinality',
		isMultiSelect: false,
		name: 'codeCardinality',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Duration',
		isMultiSelect: false,
		name: 'codeCmCohortAttdDuration',
		owner: 'sys_ai_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'College Status',
		isMultiSelect: false,
		name: 'codeCollegeStatus',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Color',
		isMultiSelect: false,
		name: 'codeColor'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Component',
		isMultiSelect: false,
		name: 'codeComponent',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Confirm Type',
		isMultiSelect: false,
		name: 'codeConfirmType',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Data Type',
		isMultiSelect: false,
		name: 'codeDataType'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Data Type - Display',
		isMultiSelect: false,
		name: 'codeDataTypeDisplay'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Operation',
		isMultiSelect: false,
		name: 'codeDbDataOp'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Data Source - Value',
		isMultiSelect: false,
		name: 'codeDbDataSourceValue'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Disability Status',
		isMultiSelect: false,
		name: 'codeDisabilityStatus',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Field Element',
		isMultiSelect: false,
		name: 'codeFieldElement'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Ethnicity',
		isMultiSelect: false,
		name: 'codeEthnicity',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Gender',
		isMultiSelect: false,
		name: 'codeGender',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Icon',
		isMultiSelect: false,
		name: 'codeIcon'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Job Type',
		isMultiSelect: false,
		name: 'codeJobType'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'List - Edit - Preset Type',
		isMultiSelect: false,
		name: 'codeListEditPresetType'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Mask',
		isMultiSelect: false,
		name: 'codeMask'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Source Type',
		isMultiSelect: false,
		name: 'codeMigrSourceType'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Certifications',
		isMultiSelect: true,
		name: 'codeMultiCerts'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Exams',
		isMultiSelect: true,
		name: 'codeMultiExams'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Items - Included',
		isMultiSelect: true,
		name: 'codeMultiItemsIncluded'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Items - Not Included',
		isMultiSelect: true,
		name: 'codeMultiItemsNotIncluded'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Requirements',
		isMultiSelect: true,
		name: 'codeMultiRqmts'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Navigation Type',
		isMultiSelect: false,
		name: 'codeNavType',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Node Type',
		isMultiSelect: false,
		name: 'codeNodeType',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Object Type',
		isMultiSelect: false,
		name: 'codeObjType',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Token Action',
		isMultiSelect: false,
		name: 'codePacketAction',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Parm Type',
		isMultiSelect: false,
		name: 'codeParmType'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Placement Related To Training',
		isMultiSelect: false,
		name: 'codePlacementRelated'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Query Type',
		isMultiSelect: false,
		name: 'codeQueryType',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Race',
		isMultiSelect: false,
		name: 'codeRace',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Referral End Type',
		isMultiSelect: false,
		name: 'codeReferralEndType',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Referral Type',
		isMultiSelect: false,
		name: 'codeReferralType',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Report Element Type',
		isMultiSelect: false,
		name: 'codeReportElementType'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Sector',
		isMultiSelect: false,
		name: 'codeSector'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'List Direction',
		isMultiSelect: false,
		name: 'codeSortDir'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'State',
		isMultiSelect: false,
		name: 'codeState',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Status',
		isMultiSelect: false,
		name: 'codeStatus',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Trigger - Conditional Confirm',
		isMultiSelect: false,
		name: 'codeTriggerConfirmConditional',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Trigger - Show',
		isMultiSelect: false,
		name: 'codeTriggerShow',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Trigger - Timing',
		isMultiSelect: false,
		name: 'codeTriggerTiming',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Type',
		isMultiSelect: false,
		name: 'codeType',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Payment Type',
		isMultiSelect: false,
		name: 'codeTypePayment',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Tags',
		isMultiSelect: false,
		name: 'codeUserTypeTags'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Wage Type',
		isMultiSelect: false,
		name: 'codeWageType'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Cohort',
		isMultiSelect: false,
		name: 'cohort'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Cohort Attendance',
		isMultiSelect: false,
		name: 'cohortAttd'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Attendance Records',
		isMultiSelect: true,
		name: 'cohortAttds'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Cohorts',
		isMultiSelect: true,
		name: 'cohorts'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'College - GPA',
		name: 'collegeGPA'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'int16',
		header: 'College - Grad Year',
		name: 'collegeGradYear'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'College - Major',
		name: 'collegeMajor'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'College - Name',
		name: 'collegeName'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Column',
		isMultiSelect: false,
		name: 'column'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Column - Backlink',
		isMultiSelect: false,
		name: 'columnBacklink'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Parent Column',
		isMultiSelect: false,
		name: 'columnParent',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Columns',
		isMultiSelect: true,
		name: 'columns'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Comment',
		name: 'comment'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Hours (Computed)',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'computedHours'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Confirm',
		isMultiSelect: false,
		name: 'confirm',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Button Label - Cancel',
		name: 'confirmButtonLabelCancel'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Button Label - Confirm',
		name: 'confirmButtonLabelConfirm'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Confirm Message',
		name: 'confirmMessage'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Confirm Title',
		name: 'confirmTitle'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Contact',
		isMultiSelect: false,
		name: 'contact',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Contacts',
		isMultiSelect: true,
		name: 'contacts',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Cost',
		minValue: 0,
		name: 'cost'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Course',
		isMultiSelect: false,
		name: 'course',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'datetime',
		header: 'Created At',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'createdAt'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Created By',
		isMultiSelect: false,
		isExcludeUpdate: true,
		name: 'createdBy',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Service Flow',
		isMultiSelect: false,
		name: 'csf'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Cohort',
		isMultiSelect: false,
		name: 'csfCohort'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Attendance Records',
		isMultiSelect: true,
		name: 'csfCohortAttds'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Cohorts',
		isMultiSelect: true,
		name: 'csfCohorts'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'custom_element',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		isNonData: true,
		name: 'custom_element'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'custom_element_bool',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_element_bool'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 'custom_element_date',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_element_date'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'custom_element_float',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_element_float'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int64',
		header: 'custom_element_int',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_element_int'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'custom_element_link',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		isMultiSelect: false,
		name: 'custom_element_link'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'custom_element_str',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_element_str'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'none',
		header: 'custom_embed_shell',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		name: 'custom_embed_shell'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'none',
		header: 'custom_row_end',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		isNonData: true,
		name: 'custom_row_end'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'none',
		header: 'custom_row_start',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		isNonData: true,
		name: 'custom_row_start'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'none',
		header: 'custom_section_end',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		isNonData: true,
		name: 'custom_section_end'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'none',
		header: 'custom_section_start',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		isNonData: true,
		name: 'custom_section_start'
	})

	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Custom - Action - Method',
		name: 'customColActionMethod'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Custom Action - Type',
		name: 'customColActionType'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Custom - Action - Value',
		name: 'customColActionValue'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Custom - Align',
		name: 'customColAlign'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Custom - Color',
		isMultiSelect: false,
		name: 'customColCodeColor'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Custom - Label',
		name: 'customColLabel'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Custom - Prefix',
		name: 'customColPrefix'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Custom - Size',
		name: 'customColSize'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Custom - Source',
		name: 'customColSource'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Custom - Source Key',
		name: 'customColSourceKey'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Custom - Type',
		isMultiSelect: false,
		name: 'customColType',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Embed Shell Fields',
		isMultiSelect: true,
		name: 'customEmbedShellFields'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Data',
		name: 'data'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Data Object',
		isMultiSelect: false,
		name: 'dataObj'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Data Object - Embed',
		isMultiSelect: false,
		name: 'dataObjEmbed'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Data Object - List',
		isMultiSelect: false,
		name: 'dataObjList'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Data Object - Modal',
		isMultiSelect: false,
		name: 'dataObjModal'
	})

	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 'Date',
		name: 'date'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 'End Date',
		name: 'dateEnd'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 'Estimated End Date',
		name: 'dateEndEst'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 'Expiration Date',
		name: 'dateExpires'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 'Issued Date',
		name: 'dateIssued'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 'Referral Date',
		name: 'dateReferral'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 'Start Date',
		name: 'dateStart'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 'Estimated Start Date',
		name: 'dateStartEst'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'date',
		header: 'Date Submitted',
		name: 'dateSubmitted'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Description',
		name: 'description'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'My Description',
		name: 'descriptionUser'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Display',
		name: 'display'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Element',
		isMultiSelect: false,
		name: 'element'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Elements',
		isMultiSelect: true,
		name: 'elements'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Email',
		name: 'email'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Employer - Contact Email',
		name: 'employerContactEmail',
		owner: 'sys_ai_old'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Employer - Contact First Name',
		name: 'employerContactNameFirst',
		owner: 'sys_ai_old'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Employer - Contact Last Name',
		name: 'employerContactNameLast',
		owner: 'sys_ai_old'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Employer',
		name: 'employerName',
		owner: 'sys_ai_old'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Expression',
		name: 'expr',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Expression - Auto Select',
		name: 'exprAutoSelect',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Expression - Custom',
		name: 'exprCustom',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Expression - Filter',
		name: 'exprFilter',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Expression - Object',
		name: 'exprObject',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Expression - Preset',
		name: 'exprPreset',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Expression - Property Display',
		name: 'exprPropDisplay'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Expression - Select',
		name: 'exprSelect'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Expression - Sort',
		name: 'exprSort',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Storage Key Expression',
		name: 'exprStorageKey'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Expression - With',
		name: 'exprWith',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Favorite Food',
		isMultiSelect: true,
		name: 'favFood'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Embed Detail',
		isMultiSelect: false,
		name: 'fieldEmbedDetail',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Embed List Config',
		isMultiSelect: false,
		name: 'fieldEmbedListConfig',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Embed List Edit',
		isMultiSelect: false,
		name: 'fieldEmbedListEdit',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Embed List Select',
		isMultiSelect: false,
		name: 'fieldEmbedListSelect',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'List-Items',
		isMultiSelect: false,
		name: 'fieldListItems',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Field List Parm - Name',
		name: 'fieldListItemsParmName'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'json',
		exprStorageKey: 'file_<calc,int64,random10>',
		header: 'File',
		name: 'file'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'First Name',
		name: 'firstName'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Full Name',
		name: 'fullName'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Has Management Columns',
		name: 'hasMgmt',
		togglePresetTrue: true,
		toggleValueFalse: 'No',
		toggleValueTrue: 'Yes'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Header',
		name: 'header'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Header (Alternate)',
		name: 'headerAlt'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Header (Side)',
		name: 'headerSide'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'My Name',
		name: 'headerUser'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Height',
		name: 'height'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Hours',
		maxValue: 24,
		minValue: 0,
		name: 'hours',
		spinStep: '0.25'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Hours Per Week',
		minValue: 0,
		name: 'hoursPerWeek'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Icon',
		name: 'icon'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'uuid',
		header: 'System ID',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'id'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Index',
		name: 'index'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Parent Index',
		name: 'indexParent'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Table Index',
		name: 'indexTable'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'With Index',
		name: 'indexWith'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Active',
		name: 'isActive'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Display',
		name: 'isDisplay'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Displayable',
		name: 'isDisplayable'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Display Block',
		name: 'isDisplayBlock'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Exclude-Insert',
		name: 'isExcludeInsert'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Exclude-Select',
		name: 'isExcludeSelect'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Exclude-Update',
		name: 'isExcludeUpdate'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Global Resource',
		name: 'isGlobalResource'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Hide Row Manager',
		name: 'isHideRowManager'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Initialize Table',
		name: 'isInitTable'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'List - Edit',
		name: 'isListEdit'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'List Row Action',
		name: 'isListRowAction'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'List - Suppress Filter/Sort',
		name: 'isListSuppressFilterSort'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'List - Suppress Select',
		name: 'isListSuppressSelect'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Multiple Select',
		name: 'isMultiSelect'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Non-Data',
		name: 'isNonData'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Required',
		name: 'isRequired'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Self Reference',
		name: 'isSelfReference'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Self Signup',
		name: 'isSelfSignup'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Share With Student',
		name: 'isShareWithClient'
	})
	await addColumn({
		codeDataType: 'bool',
		header: 'User Selected - System',
		name: 'isSystemRootNode',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Items',
		isMultiSelect: true,
		name: 'items'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Key',
		name: 'key'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Last Name',
		name: 'lastName'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'json',
		header: 'Link',
		name: 'link'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Link-Columns',
		isMultiSelect: true,
		name: 'linkColumns'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Link - Expression - Preset',
		name: 'linkExprPreset'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Link - Expression - Save',
		name: 'linkExprSave'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Link - Expression - Select',
		name: 'linkExprSelect'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Link-Table',
		isMultiSelect: false,
		name: 'linkTable'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'List - Edit - Preset Expression',
		name: 'listEditPresetExpr',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'List - Reorder Column',
		name: 'listReorderColumn'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Logo File Name',
		name: 'logoFileName'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Match Column',
		name: 'matchColumn'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'int16',
		header: 'Maximum Length',
		name: 'maxLength'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Minimum Length',
		name: 'minLength'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Maximum Value',
		name: 'maxValue'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Middle Name',
		name: 'middleName'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Minimum Value',
		name: 'minValue'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Module',
		name: 'mod'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'datetime',
		header: 'Modified At',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'modifiedAt'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Modified By',
		isMultiSelect: false,
		name: 'modifiedBy',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Name',
		name: 'name'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Custom Name',
		name: 'nameCustom'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Nodes',
		isMultiSelect: true,
		name: 'nodes',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Note',
		name: 'note'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Office',
		isMultiSelect: false,
		name: 'office'
	})

	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Order',
		name: 'order'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Order - Crumb',
		name: 'orderCrumb'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Order - Define',
		name: 'orderDefine'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Order - Display',
		name: 'orderDisplay'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'List Sort Order',
		name: 'orderSort'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Owner',
		isMultiSelect: false,
		name: 'owner',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Page',
		name: 'page'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Parent',
		isMultiSelect: false,
		isSelfReference: true,
		name: 'parent'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Parent Column',
		isMultiSelect: false,
		name: 'parentColumn'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Parent - Filter Expression',
		name: 'parentFilterExpr'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Parent Table',
		isMultiSelect: false,
		name: 'parentTable'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Parm',
		isMultiSelect: false,
		name: 'parm'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Parms',
		isMultiSelect: true,
		name: 'parms'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'json',
		header: 'Value',
		name: 'parmValue'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Participant',
		isMultiSelect: false,
		name: 'participant'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Password',
		name: 'password'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Pattern',
		name: 'pattern'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Pattern Message',
		name: 'patternMsg'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Pattern Replacement',
		name: 'patternReplacement'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Person',
		isMultiSelect: false,
		name: 'person',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Alternate Phone',
		name: 'phoneAlt'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Mobile Phone',
		name: 'phoneMobile'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Placeholder',
		name: 'placeHolder'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Process - Type',
		isMultiSelect: false,
		name: 'processType'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Report',
		isMultiSelect: false,
		name: 'report'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Resource',
		isMultiSelect: false,
		name: 'resource'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Resources',
		isMultiSelect: true,
		name: 'resources'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Resources - App',
		isMultiSelect: true,
		name: 'resources_sys_app'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Resources - Footer',
		isMultiSelect: true,
		name: 'resources_sys_footer'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Schedule',
		name: 'schedule'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'School',
		name: 'school'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Service Flow',
		isMultiSelect: false,
		name: 'serviceFlow',
		owner: 'sys_ai_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Spin Step',
		name: 'spinStep'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Staff - Administrator',
		isMultiSelect: false,
		name: 'staffAdmin'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Staff - Agency',
		isMultiSelect: false,
		name: 'staffAgency'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Staff - Instructor',
		isMultiSelect: false,
		name: 'staffInstructor'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Statuses',
		isMultiSelect: true,
		name: 'statuses'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Sub-Header',
		name: 'subHeader',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Systems',
		isMultiSelect: true,
		name: 'systems',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Table',
		isMultiSelect: false,
		name: 'table'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Tables',
		isMultiSelect: true,
		name: 'tables',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Source Tables',
		isMultiSelect: true,
		name: 'tablesSource',
		owner: 'sys_system_old'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Target Tables',
		isMultiSelect: true,
		name: 'tablesTarget',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'json',
		header: 'Test',
		isMultiSelect: true,
		name: 'test'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Title',
		name: 'title'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'bool',
		header: 'Toggle Preset True',
		name: 'togglePresetTrue'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Toggle Value-False',
		name: 'toggleValueFalse'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Toggle Value-True',
		name: 'toggleValueTrue'
	})
	await addColumn({
		codeDataType: 'bool',
		header: 'Toggle Value-Show',
		name: 'toggleValueShow',
		owner: 'sys_system_old'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Triggers',
		isMultiSelect: true,
		name: 'triggers'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'User',
		isMultiSelect: false,
		name: 'user'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'User Name',
		name: 'userName'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'UserTypes',
		isMultiSelect: true,
		name: 'userTypes'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'Users',
		isMultiSelect: true,
		name: 'users'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Value',
		name: 'value'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Value-Decimal',
		name: 'valueDecimal'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int64',
		header: 'Value-Integer',
		name: 'valueInteger'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Value-String',
		name: 'valueString'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'float64',
		header: 'Wage',
		name: 'wage'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Website',
		name: 'website'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeAlignment: 'right',
		codeDataType: 'int16',
		header: 'Width',
		name: 'width'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'link',
		header: 'With Expressions',
		isMultiSelect: true,
		name: 'withs'
	})
	await addColumn({
		owner: 'sys_system_old',
		codeDataType: 'str',
		header: 'Zip',
		name: 'zip'
	})
}
