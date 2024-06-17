export class Process {
	exe() {}
}

export class ProcessMigrate extends Process {
	constructor() {
		super()
	}
}

export class ProcessStatus {
	items: ProcessStatusItem[] = []
	constructor() {}
	reset() {
		this.items.forEach((item) => {
			item.reset()
		})
	}
}

export class ProcessStatusItem {
	header: string
	name: string
	valueCurent: number
	valueMax: number
	constructor(name: string, header: string, valueMax: number) {
		this.name = name
		this.header = header
		this.valueCurent = 0
		this.valueMax = valueMax
	}
	increment() {
		this.valueCurent++
	}
	reset() {
		this.valueCurent = 0
	}
}
