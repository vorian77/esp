import type { DataRecord } from '$utils/types'
import { debug } from '$utils/types'

const recordCount = 100

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
			'Alfred',
			'Alvin',
			'Anita',
			'Armando',
			'Aaron',
			'Amarion',
			'Barbara',
			'Bernard',
			'Betty',
			'Billy',
			'Brenda',
			'Carla',
			'Caroline',
			'Carson',
			'Cassandra',
			'Courney',
			'Daisy',
			'Daniel',
			'Darlene',
			'Darrell',
			'David',
			'Debbie',
			'Denise',
			'Frank',
			'Gerald',
			'Gloria',
			'Harold',
			'Jalen',
			'Keyla',
			'Kiana',
			'Kira',
			'Kisha',
			'Philip',
			'Raoul',
			'Raven',
			'Rebecca',
			'Regina',
			'Rhonda',
			'Richard',
			'Tanesha',
			'Tara',
			'Terrell',
			'Verlynn',
			'Yancy',
			'Zharia'
		]
	},
	lastName: {
		type: 'list',
		values: [
			'Adams',
			'Anderson',
			'Armstrong',
			'Avery',
			'Baker',
			'Ballard',
			'Banks',
			'Barnes',
			'Bell',
			'Bennett',
			'Benson',
			'Berry',
			'Beard',
			'Brown',
			'Bryant',
			'Butler',
			'Campbell',
			'Carter',
			'Clark',
			'Conley',
			'Cox',
			'Crawford',
			'Davis',
			'Dixon',
			'Dorsey',
			'Edwards',
			'Evans',
			'Fisher',
			'Ford',
			'Foster',
			'Franklin',
			'Gaines',
			'Garcia',
			'Gibson',
			'Gonzalez',
			'Green',
			'Griffin',
			'Gross',
			'Hall',
			'Harris',
			'Hayes',
			'Henderson',
			'Hicks',
			'Hill',
			'Hines',
			'Holland',
			'Hopkins',
			'Hudson',
			'Johnson',
			'Jones',
			'Lawson',
			'Lyons',
			'Oatis',
			'Sandifer',
			'Smith',
			'Stallings',
			'Stewart',
			'Taylor',
			'Thelen',
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
		dateStart: '2025-01-02',
		dateEnd: '2025-02-10'
	},
	dateStart: {
		type: 'date',
		dateStart: '2025-01-02',
		dateEnd: '2025-02-10'
	},
	optionalDates: {
		rate: 0.7,
		type: 'optional',
		values: [
			['dateStart', { type: 'date', dateStart: '2025-01-02', dateEnd: '2025-02-10' }],
			['dateEnd', { type: 'date', dateStart: '2025-01-02', dateEnd: '2025-02-10' }]
		]
	},
	codeStatus: {
		type: 'list',
		values: [
			'New application',
			'Application under review',
			'Pending eligibility documentation',
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
		dateStart: '2025-01-02',
		dateEnd: '2025-02-10'
	},
	codeType: {
		type: 'list',
		values: [
			'Alien Registration Card',
			'Applicant Statement',
			'Birth Certificate',
			'Drivers License',
			'Hospital Record of Birth',
			'Lease',
			'MVA Identification',
			'School Record',
			'Selective Service Registration Card',
			'Social Security Card'
		]
	}
}

const recordDataDoc = ['dateIssued', 'codeType']

const dataItemsDataMsg = {
	date: {
		type: 'date',
		dateStart: '2025-01-05',
		dateEnd: '2025-02-15'
	},
	codeStatus: {
		type: 'list',
		values: ['closed', 'replied', 'sent', 'underReview']
	},
	subject: {
		type: 'list',
		values: ['Question about my application?', 'Question about documents?', 'More info', 'Help']
	},
	office: {
		type: 'list',
		values: ['moedOfficeWestside', 'moedOfficeEastside']
	}
}

const recordDataMsg = ['date', 'codeStatus', 'subject', 'office']

export class RandomDataGenerator {
	data: DataRecord = {}
	constroctor() {}
	addData(
		label: string,
		record: string[],
		dataItems: Partial<Record<string, any>>,
		recCnt: number,
		dataFactor: number
	) {
		let newData: any[] = []
		const totalRecords = dataFactor !== 0 ? Math.floor(dataFactor * recCnt) : recCnt
		console.log('generatedData', { label, dataFactor, recCnt, totalRecords })
		for (let i = 0; i < totalRecords; i++) {
			let newRow: any[] = []
			const recIdx = dataFactor !== 0 ? Math.floor(this.getRandomValue(recCnt)) : i
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
		this.addData('applicant', recordPart, dataItemsPart, recordCount, 0)
		this.addData('serviceFlow', recordServiceFlow, dataItemsServiceFlow, recordCount, 0)
		this.addData('dataDoc', recordDataDoc, dataItemsDataDoc, recordCount, 0.75)
		this.addData('dataMsg', recordDataMsg, dataItemsDataMsg, recordCount, 0.5)
	}
}

export const moedDataApplicant = new RandomDataGenerator()
