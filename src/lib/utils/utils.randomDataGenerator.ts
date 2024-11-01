import type { DataRecord } from '$utils/types'

const dataItemsStudents = {
	addr1: { type: 'list', values: ['123 Main St', '456 Elm St', '789 Oak St'] },
	addr2: { type: 'list', values: ['Apt 1', 'Apt 2', ''] },
	birthDate: {
		type: 'date',
		dateStart: '2000-01-01',
		dateEnd: '2008-12-31'
	},
	city: { type: 'list', values: ['Baltimore'] },
	codeDisabilityStatus: {
		type: 'list',
		values: [
			'Without Disability',
			'Disability (impediment)',
			'Disability (no impediment)',
			'Prefer not to say'
		]
	},
	codeEthnicity: {
		type: 'list',
		values: ['Hispanic-Latino', 'Not Hispanic-Latino', 'Prefer not to say']
	},
	codeGender: {
		type: 'list',
		values: ['Female', 'Male', 'Non-Binary/Third Gender', 'Prefer not to say']
	},
	codeRace: {
		type: 'list',
		values: [
			'American Indian or Alaskan Native',
			'Asian',
			'Black or African American',
			'Native Hawaiian or Other Pacific Islander',
			'Other',
			'Two or more races',
			'White',
			'Prefer not to say'
		]
	},
	codeState: { type: 'list', values: ['Maryland'] },
	email: {
		type: 'list',
		values: [
			'123@gmail.com',
			'abc@gmail.com',
			'happyBear@gmail.com',
			'igofar@gmail.com',
			'biglove@gmail.com',
			'sunnydays@gmail.com'
		]
	},
	firstName: {
		type: 'list',
		values: [
			'Jalen',
			'Tanesha',
			'Aaron',
			'Amarion',
			'Courney',
			'Daniel',
			'Keyla',
			'Raoul',
			'Tara',
			'Verlynn',
			'Yancy',
			'Zharia'
		]
	},
	lastName: {
		type: 'list',
		values: ['Adams', 'Conley', 'Garcia', 'Lawson', 'Lyons', 'Oatis', 'Turner']
	},
	office: { type: 'list', values: ['moedOfficeEastside', 'moedOfficeWestside'] },
	phoneMobile: { type: 'number', length: 10 },
	ssn: { type: 'number', length: 9 },
	zip: { type: 'list', values: ['21202', '21201', '21205', '21206', '21207', '21208'] }
}

const recordStudents = [
	'addr1',
	'addr2',
	'birthDate',
	'city',
	'codeDisabilityStatus',
	'codeEthnicity',
	'codeGender',
	'codeRace',
	'codeState',
	'email',
	'firstName',
	'lastName',
	'office',
	'phoneMobile',
	'ssn',
	'zip'
]

const dataItemsReferrals = {
	dateReferral: {
		type: 'date',
		dateStart: '2024-01-01',
		dateEnd: '2024-1-30'
	},
	codeStatus: {
		type: 'list',
		values: [
			'Application submitted',
			'Application under review',
			'Pending eligibility documentation',
			'Pending eligibility determination',
			'Pending enrollment',
			'Enrolled',
			'Rejected'
		]
	}
}
const recordReferrals = ['dateReferral', 'codeStatus']

export class RandomDataGenerator {
	data: DataRecord = {}
	constroctor() {}
	addData(
		label: string,
		record: string[],
		dataItems: Partial<Record<string, any>>,
		recCnt: number
	) {
		let newData: any[] = []
		for (let i = 0; i < recCnt; i++) {
			let newRow: any[] = []
			newRow.push(i)
			record.forEach((key, idx) => {
				if (dataItems[key]) {
					newRow.push(this.getValue(dataItems[key]))
				}
			})
			newData.push(newRow)
		}
		this.data[label] = newData
	}

	getValue(type: any) {
		switch (type.type) {
			case 'date':
				let dateStart = new Date(type.dateStart).getTime()
				let dateEnd = new Date(type.dateEnd).getTime()
				return new Date(dateStart + Math.random() * (dateEnd - dateStart))
					.toISOString()
					.slice(0, 10)

			case 'list':
				return type.values[Math.floor(Math.random() * type.values.length)]

			case 'number':
				let value = ''
				for (var i = 0; i < type.length; i++) {
					value += Math.floor(Math.random() * 10).toString()
				}
				return value
		}
	}
}

const data = new RandomDataGenerator()
data.addData('students', recordStudents, dataItemsStudents, 50)
data.addData('referrals', recordReferrals, dataItemsReferrals, 50)
export const moedDataParticipant = data
