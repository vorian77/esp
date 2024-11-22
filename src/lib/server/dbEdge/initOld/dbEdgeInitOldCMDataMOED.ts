import { nodeObjPagesBulk } from '$server/dbEdge/init/dbEdgeInit200Utilities10'

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

	await nodeObjPagesBulk([
		[
			'app_moed_cm',
			'node_node_pgm_moed_cm_student_applicant',
			'node_page_cm_sa_app',
			'Application',
			10,
			'AppWindow',
			'/home/cm/application'
		],
		[
			'app_moed_cm',
			'node_pgm_moed_cm_student',
			'node_page_cm_student_app',
			'Application',
			10,
			'AppWindow',
			'/home/cm/application'
		],
		[
			'app_moed_cm',
			'node_pgm_moed_cm_student',
			'node_page_cm_student_goals',
			'Goals',
			20,
			'Goal',
			'/home/cm/goals'
		],
		[
			'app_moed_cm',
			'node_pgm_moed_cm_student',
			'node_page_cm_student_messages',
			'Messages',
			30,
			'Message',
			'/home/cm/messages'
		],
		[
			'app_moed_cm',
			'node_pgm_moed_cm_student',
			'node_page_cm_student_activities',
			'Activities',
			40,
			'Activity',
			'/home/cm/activities'
		],
		[
			'app_moed_cm',
			'node_pgm_moed_cm_student',
			'node_page_cm_student_quotes',
			'Quotes',
			50,
			'Quote',
			'/home/cm/quotes'
		]
	])
}
