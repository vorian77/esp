import { strRequired, valueOrDefault } from '$utils/types'

export class IconProps {
	absoluteStrokeWidth: boolean
	clazz: string
	color: string
	name: string
	onClick: Function
	size: number
	strokeWidth: number
	constructor(obj: any) {
		const clazz = 'IconParms'
		obj = valueOrDefault(obj, {})
		this.absoluteStrokeWidth = valueOrDefault(obj.absoluteStrokeWidth, false)
		this.clazz = valueOrDefault(obj.clazz, '')
		this.color = valueOrDefault(obj.color, '#000000')
		this.name = strRequired(obj.name, clazz, 'name')
		this.onClick = valueOrDefault(obj.onClick, () => {})
		this.size = valueOrDefault(obj.size, 24)
		this.strokeWidth = valueOrDefault(obj.strokeWidth, 1)
	}
}
