import { processForm } from '$server/dbForm'
import { FormSourceDBAction } from '$utils/types'

export async function POST({ request }) {
	const { formName, source, data } = await request.json()
	return await processForm(formName, source, FormSourceDBAction.upsert, data)
}
