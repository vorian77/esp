import { FormSource, FormSourceDBAction, getServerResponse, type ResponseBody } from '$utils/types'
import { sendEmail, EmailAlert } from '$server/apiSendGrid'
import { processForm } from '$server/dbForm'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/home/cm/contactUs/[officeName]/[officeId]+server.ts'

export async function POST({ request }) {
	const requestData = await request.json()
	const { formName, source, data } = requestData

	const respMsg = await sendMsgToCM(formName, source, data)
	return getServerResponse(await sendMsgToStaffEmail(respMsg.data))

	async function sendMsgToCM(formName: string, source: FormSource, data: {}) {
		const responsePromise = await processForm(formName, source, FormSourceDBAction.upsert, data)
		if (responsePromise) {
			const response: ResponseBody = await responsePromise.json()
			if (!response.success) {
				error(400, {
					file: FILENAME,
					function: `sendMsgToCm`,
					message: `Unable to create CaseManager message: applicantId: ${data.user_id}, site: ${data.cm_ssr_site}`
				})
			}
			return response
		}
	}
	async function sendMsgToStaffEmail(data: {}) {
		const emailAlert = new EmailAlert({ type: 'New Message', to: data.emailAddresses, ...data })
		return sendEmail(emailAlert.alert)
	}
}
