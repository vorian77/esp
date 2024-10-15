import { sectionHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities10'

import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import type { TokenAppTreeNodeId } from '$utils/types.token'
import { TokenApiDbTableColumns, TokenApiUserId } from '$utils/types.token'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function migrateCmCohort() {
	// const data = await migrateCohorts()
	// const data = await migrateCsfCohorts()
	// console.log('data:', data)
}

// async function migrateCohorts() {
// 	sectionHeader(`migrateCmCohorts`)
// 	const query = e.for(e.select(e.app_cm.CmCohort), (cohort) => {
// 		return e.update(e.app_cm.CmCourse, (course) => ({
// 			filter: e.op(course.id, '=', e.cast(e.uuid, cohort.course.id)),
// 			set: {
// 				cohorts: {
// 					'+=': e.select(cohort)
// 				}
// 			}
// 		}))
// 	})
// 	return await query.run(client)
// }

// async function migrateCsfCohorts() {
// 	sectionHeader(`migrateCmCsfCohorts`)
// 	const query = e.for(e.select(e.app_cm.CmCsfCohort), (csfCohort) => {
// 		return e.update(e.app_cm.CmCohort, (cohort) => ({
// 			filter: e.op(cohort.id, '=', e.cast(e.uuid, csfCohort.cohort.id)),
// 			set: {
// 				csfCohorts: {
// 					'+=': e.select(csfCohort)
// 				}
// 			}
// 		}))
// 	})
// 	return await query.run(client)
// }
