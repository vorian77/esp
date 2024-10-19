import {
	organizations,
	nodeObjPrograms,
	nodeObjPages,
	userType,
	userUserType
} from '$server/dbEdge/init/dbEdgeInit200Utilities10'

const FILE = 'init_MOED_cm'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await data()
	console.log(`${FILE}.end`)
}

const reviewQuery = ''

async function data() {
	// await users([['Baltimore', 'MOED', 'user_moed', '!alfjasf*!@#$$*&']])

	await nodeObjPages([
		[
			'app_moed_cm',
			'node_node_pgm_moed_cm_student_applicant',
			'node_page_cm_sa_app',
			'Application',
			10,
			'application',
			'/home/cm/application'
		],
		[
			'app_moed_cm',
			'node_pgm_moed_cm_student',
			'node_page_cm_student_app',
			'Application',
			10,
			'application',
			'/home/cm/application'
		],
		[
			'app_moed_cm',
			'node_pgm_moed_cm_student',
			'node_page_cm_student_goals',
			'Goals',
			20,
			'application',
			'/home/cm/goals'
		],
		[
			'app_moed_cm',
			'node_pgm_moed_cm_student',
			'node_page_cm_student_messages',
			'Messages',
			30,
			'application',
			'/home/cm/messages'
		],
		[
			'app_moed_cm',
			'node_pgm_moed_cm_student',
			'node_page_cm_student_activities',
			'Activities',
			40,
			'application',
			'/home/cm/activities'
		],
		[
			'app_moed_cm',
			'node_pgm_moed_cm_student',
			'node_page_cm_student_quotes',
			'Quotes',
			50,
			'application',
			'/home/cm/quotes'
		]
	])
	await userType([
		['app_moed_cm', 'ut_moed_cm_staff'],
		['app_moed_cm', 'ut_moed_cm_student_applicant'],
		['app_moed_cm', 'ut_moed_cm_student']
	])
}
