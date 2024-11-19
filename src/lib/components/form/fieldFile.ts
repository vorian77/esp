import { Field, PropsFieldRaw } from '$comps/form/field'
import { strRequired, valueOrDefault } from '$utils/utils'
import { evalExpr } from '$routes/api/dbEdge/dbEdgeGetVal'
import { TokenApiQueryData } from '$utils/types.token'

const FILENAME = '$comps/Form/fieldFile.ts'

export class FieldFile extends Field {
	storageKeyExpr: string
	width: number
	constructor(props: PropsFieldRaw) {
		super(props)
		const obj = valueOrDefault(props.propRaw, {})
		this.storageKeyExpr = strRequired(obj.colDB.exprStorageKey, 'FieldFile', 'storageKeyExpr')
		this.width = valueOrDefault(obj.width, 300)
	}
	getKey() {
		return evalExpr(this.storageKeyExpr, new TokenApiQueryData({}))
	}
}

export class FileStorage {
	downloadUrl: string
	fileName: string
	fileType: string
	key: string
	url: string
	constructor(obj: any) {
		const clazz = 'FileStorage'
		obj = valueOrDefault(obj, {})
		this.downloadUrl = strRequired(obj.downloadUrl, clazz, 'downloadUrl')
		this.fileName = strRequired(obj.fileName, clazz, 'fileName')
		this.fileType = strRequired(obj.fileType, clazz, 'fileType')
		this.key = strRequired(obj.key, clazz, 'key')
		this.url = strRequired(obj.url, clazz, 'url')
	}
}
