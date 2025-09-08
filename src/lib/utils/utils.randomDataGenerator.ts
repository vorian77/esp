import type { DataRecord } from '$utils/types'
import { debug, getArray } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = 'utils.randomDataGenerator.ts'

const recordCount = 25
const universalStartDate = '2025-07-01'

// values example
// site: {
// 	type: 'list',
// 	values: [
// 		[{ type: 'at_app_cm_site', obj: 'at_app_cm_site_moed_office_east' }],
// 		[{ type: 'at_app_cm_site', obj: 'at_app_cm_site_moed_office_west' }]
// 	]
// },

/* participant */
const dataPart = {
	addr1: { type: 'list', values: ['123 Main St', '456 Elm St', '789 Oak St'] },
	addr2: { type: 'list', values: ['Apt 1', 'Apt 2', ''] },
	birthDate: {
		type: 'dateRange',
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
	codeLivingArrangements: {
		type: 'list',
		values: [
			'I am currently homeless',
			'I live on my own',
			'I live with my parent(s) or other guardian(s)'
		]
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
	'codeLivingArrangements',
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

/* service flow */
const dataServiceFlow = {
	cmSite: {
		type: 'list',
		values: ['at_app_cm_site_moed_office_east', 'at_app_cm_site_moed_office_west']
	},
	dateCreated: {
		date: universalStartDate,
		daysMin: 0,
		daysMax: 10,
		type: 'daysAfterDate'
	},
	dateStart: {
		daysMin: 0,
		daysMax: 4,
		rate: 0.5,
		// rate: 1.0,
		refn: 'dateCreated',
		type: 'daysAfterRefn'
	},
	dateEnd: {
		daysMin: 0,
		daysMax: 4,
		rate: 0.5,
		// rate: 0.0,
		refn: 'dateStart',
		type: 'daysAfterRefn'
	},
	codeStatus: {
		type: 'listDependent',
		parms: [
			{
				prop: 'dateEnd',
				values: ['Enrolled', 'Rejected']
			},
			{
				prop: 'dateStart',
				values: ['Enrolled']
				// values: [
				// 	'Application under review',
				// 	'Pending eligibility documentation',
				// 	'Pending enrollment'
				// ]
			},
			{
				prop: 'dateCreated',
				values: ['New application']
			}
		]
	},
	codeOutcome: {
		type: 'listDependent',
		parms: [
			{
				prop: 'dateEnd',
				values: ['Did not complete']
			}
		]
	}
}
const recordServiceFlow = [
	'cmSite',
	'dateCreated',
	'dateStart',
	'dateEnd',
	'codeStatus',
	'codeOutcome'
]

/* document */
const dataDoc = {
	datetimeIssued: {
		date: universalStartDate,
		daysMin: 0,
		daysMax: 14,
		type: 'daysAfterDate'
	},
	codeType: {
		type: 'list',
		values: [
			'Applicant Statement of Address',
			'Applicant Statement of Date of Birth',
			'Drivers License',
			'Lease',
			'Selective Service Registration Card',
			'Social Security Card',
			'U.S. Hospital Record of Birth'
		]
	}
}

const recordDoc = ['datetimeIssued', 'codeType']

/* user */
const dataUser = {}
const recordUser: any[] = []

/* message */
const dataMsg = {
	subject: {
		type: 'list',
		values: ['Question about my application?', 'Question about documents?', 'More info', 'Help']
	},
	recipient: {
		type: 'list',
		values: ['group_msg_moed_staff_east', 'group_msg_moed_staff_west']
	}
}

const recordMsg = ['subject', 'recipient']

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
		const totalRecords = dataFactor === 1 ? recCnt : Math.floor(dataFactor * recCnt)
		for (let i = 0; i < totalRecords; i++) {
			let newRow: any[] = []
			const recIdx = dataFactor === 1 ? i : Math.floor(this.getRandomValue(recCnt))
			newRow.push(recIdx)
			record.forEach((key) => {
				if (dataItems[key]) {
					const dataItem = dataItems[key]
					const isInclude = this.isInclude(dataItem.rate)
					if (isInclude) {
						newRow.push(this.getValue(dataItem, record, newRow))
					} else {
						newRow.push(undefined)
					}
				}
			})
			newData.push(newRow)
		}
		this.data[label] = newData
	}

	getValue(type: DataRecord, record: DataRecord, newRow: any[]) {
		let propIdx: number = -1
		let refnValue: any

		switch (type.type) {
			case 'boolean':
				return this.isInclude(type.rateTrue)

			case 'dateRange':
				const dateStart = new Date(type.dateStart).getTime()
				const dateEnd = new Date(type.dateEnd).getTime()
				return this.formatDate(new Date(dateStart + this.getRandomValue(dateEnd - dateStart)))

			case 'daysAfterDate':
				return this.getDaysAfter(type.date, type)

			case 'daysAfterDateTime':
				return this.getDaysAfter(type.date, type) + 'T00:00:00-00:00'

			case 'daysAfterRefn':
				// get refn date
				propIdx = this.getPropIdx(record, type.refn)
				refnValue = propIdx > -1 ? newRow[propIdx] : undefined
				if (!refnValue) return undefined

				return this.getDaysAfter(refnValue, type)

			case 'equal':
				propIdx = this.getPropIdx(record, type.prop)
				return propIdx > -1 ? newRow[propIdx] : undefined

			case 'list':
				return this.getListValue(type.values)

			case 'listDependent':
				const parms = getArray(type.parms)
				for (let i = 0; i < parms.length; i++) {
					const parm = parms[i]
					propIdx = this.getPropIdx(record, parm.prop)
					refnValue = propIdx > -1 ? newRow[propIdx] : undefined
					if (refnValue) return this.getListValue(parm.values)
				}

			case 'number':
				let value = ''
				for (var i = 0; i < type.length; i++) {
					value += this.getRandomValue(10).toString()
				}
				return value

			default:
				error(500, {
					file: FILENAME,
					function: 'getValue',
					msg: `No case defined for type: ${type.type}`
				})
		}
	}

	formatDate(date: Date) {
		return date.toISOString().slice(0, 10)
	}

	getDaysAfter(dateString: Date, type: DataRecord) {
		const daysAfter = this.getRandomValueBetween(type.daysMin, type.daysMax)
		const newDate = new Date(dateString)
		newDate.setDate(newDate.getDate() + daysAfter)
		return this.formatDate(newDate)
	}

	getListValue(values: string[]) {
		return values[this.getRandomValue(values.length)]
	}

	getPropIdx(record: DataRecord, prop: string) {
		const propIdx = record.indexOf(prop)
		return propIdx > -1 ? propIdx + 1 : -1
	}

	getRandomValue(max: number) {
		return Math.floor(Math.random() * max)
	}

	getRandomValueBetween(min: number, max: number) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	isInclude(rate: number | undefined) {
		if (!rate) return true
		return this.getRandomValue(100) / 100 < rate
	}

	setData() {
		this.addData('applicant', recordPart, dataPart, recordCount, 1)
		this.addData('dataDoc', recordDoc, dataDoc, recordCount, 0.75)
		this.addData('dataMsg', recordMsg, dataMsg, recordCount, 0.5)
		this.addData('serviceFlow', recordServiceFlow, dataServiceFlow, recordCount, 1)
		this.addData('user', recordUser, dataUser, recordCount, 1)

		// debug('randomDataGenerator', 'serviceFlow', JSON.stringify(this.data['serviceFlow']))
		// debug('randomDataGenerator', 'applicant', this.data['applicant'])
		// debug('randomDataGenerator', 'dataMsg', this.data['dataMsg'])
	}
}

export const moedDataApplicant = new RandomDataGenerator()
