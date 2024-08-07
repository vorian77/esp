import { Field, RawFieldProps } from '$comps/form/field'
import { strRequired, valueOrDefault } from '$utils/utils'
import { evalExpr } from '$routes/api/dbEdge/dbEdgeGetVal'
import { TokenApiQueryData } from '$utils/types.token'

const FILENAME = '$comps/Form/fieldFile.ts'

export class FieldFile extends Field {
	storageKeyExpr: string
	width: number
	constructor(props: RawFieldProps) {
		super(props)
		const obj = valueOrDefault(props.propRaw, {})
		this.storageKeyExpr = strRequired(obj.colDB.exprStorageKey, 'FieldFile', 'storageKeyExpr')
		this.width = valueOrDefault(obj.width, 300)
	}
	static async init(props: RawFieldProps) {
		return new FieldFile(props)
	}
	getKey() {
		return evalExpr(this.storageKeyExpr, new TokenApiQueryData({}))
	}
}

export class FileStorage {
	fileName: string
	fileType: string
	key: string
	constructor(fileName: string, fileType: string, key: string) {
		this.fileName = fileName
		this.fileType = fileType
		this.key = key
	}
}
