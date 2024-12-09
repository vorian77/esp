import type { DataRecord } from '$utils/types'

const recordCount = 0

const dataItemsPart = {
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
		values: [
			'Adams',
			'Conley',
			'Garcia',
			'Harris',
			'Johnson',
			'Lawson',
			'Lyons',
			'Oatis',
			'Smith',
			'Turner'
		]
	},
	office: { type: 'list', values: ['moedOfficeEastside', 'moedOfficeWestside'] },
	phoneMobile: { type: 'number', length: 10 },
	ssn: { type: 'number', length: 9 },
	zip: { type: 'list', values: ['21202', '21201', '21205', '21206', '21207', '21208'] }
}

const recordPart = [
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

const dataItemsServiceFlow = {
	dateCreated: {
		type: 'date',
		dateStart: '2024-10-01',
		dateEnd: '2024-12-4'
	},
	dateStart: {
		type: 'date',
		dateStart: '2024-10-01',
		dateEnd: '2024-12-4'
	},
	optionalDates: {
		rate: 0.7,
		type: 'optional',
		values: [
			['dateStart', { type: 'date', dateStart: '2024-10-01', dateEnd: '2024-12-4' }],
			['dateEnd', { type: 'date', dateStart: '2024-10-01', dateEnd: '2024-12-4' }]
		]
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
const recordServiceFlow = ['dateCreated', 'optionalDates', 'codeStatus']

const dataItemsDataDoc = {
	dateIssued: {
		type: 'date',
		dateStart: '2024-10-01',
		dateEnd: '2024-12-4'
	},
	codeType: {
		type: 'list',
		values: [
			'Acknowledgement Letter',
			'Applicant Statement',
			'Birth Certificate',
			'Drivers License',
			'Hospital Record of Birth',
			'Lease',
			'MVA Identification',
			'School Transcript',
			'Selective Service Registration Card',
			'Social Security Card'
		]
	}
}

const recordDataDoc = ['dateIssued', 'codeType']

const dataItemsDataMsg = {
	codeStatus: {
		type: 'list',
		values: ['Closed', 'Responded', 'Sent', 'Under review']
	},
	date: {
		type: 'date',
		dateStart: '2024-10-01',
		dateEnd: '2024-12-4'
	},
	office: { type: 'list', values: ['moedOfficeEastside', 'moedOfficeWestside'] }
}

const recordDataMsg = ['date', 'codeStatus', 'office']

export class RandomDataGenerator {
	data: DataRecord = {}
	constroctor() {}
	addData(
		label: string,
		record: string[],
		dataItems: Partial<Record<string, any>>,
		recCnt: number,
		isData: boolean
	) {
		let newData: any[] = []
		const totalRecords = isData ? Math.ceil(this.getRandomValue(5) * recCnt) : recCnt
		for (let i = 0; i < totalRecords; i++) {
			let newRow: any[] = []
			const recIdx = isData ? Math.ceil(this.getRandomValue(recCnt)) : i
			newRow.push(recIdx)
			record.forEach((key, idx) => {
				if (dataItems[key]) {
					const dataItem = dataItems[key]
					if (dataItem.type === 'optional') {
						let rate = dataItem.rate
						let values = dataItem.values
						let random = this.getRandomValue(100) / 100

						if (rate < random) {
							values.forEach((v: any) => {
								newRow.push(this.getValue({ type: 'undefined' }))
							})
						} else {
							const idxData = this.getRandomValue(values.length)
							values.forEach((v: any, i: number) => {
								let type = v[0]
								let config = v[1]
								if (i === idxData) {
									newRow.push(this.getValue({ type, ...config }))
								} else {
									newRow.push(this.getValue({ type: 'undefined' }))
								}
							})
						}
					} else newRow.push(this.getValue(dataItem))
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
				return new Date(dateStart + this.getRandomValue(dateEnd - dateStart))
					.toISOString()
					.slice(0, 10)

			case 'list':
				return type.values[this.getRandomValue(type.values.length)]

			case 'number':
				let value = ''
				for (var i = 0; i < type.length; i++) {
					value += this.getRandomValue(10).toString()
				}
				return value

			case 'undefined':
				return undefined
		}
	}
	getRandomValue(max: number) {
		return Math.floor(Math.random() * max)
	}
	setData() {
		this.addData('participant', recordPart, dataItemsPart, recordCount, false)
		this.addData('serviceFlow', recordServiceFlow, dataItemsServiceFlow, recordCount, false)
		this.addData('dataDoc', recordDataDoc, dataItemsDataDoc, recordCount, true)
		this.addData('dataMsg', recordDataMsg, dataItemsDataMsg, recordCount, true)
	}
}

export const moedDataParticipant = new RandomDataGenerator()
