import e from '$db/dbschema/edgeql-js'
import { client, sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { TokenApiDbTableColumns, TokenApiUserId } from '$utils/types.token'

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
