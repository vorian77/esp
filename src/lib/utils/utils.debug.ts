export function debug(feature: string, dataLabel: string = '', data: any = undefined) {
	console.log()
	console.log('------------ DEBUG ------------')
	console.log('FEATURE:', feature)
	if (dataLabel) console.log('DATA:', dataLabel)
	if (data) console.log(data)
	console.log()
}

export function debugData(feature: string, dataLabel: string = '', data: any[]) {
	const displayRows = 3
	debug(feature, dataLabel, { TotalRows: data.length, data: data.slice(0, displayRows) })
}
