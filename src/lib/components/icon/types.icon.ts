import { strRequired, valueOrDefault } from '$utils/types'

export class IconProps {
	absoluteStrokeWidth: boolean
	clazz: string
	color?: string
	isNav: boolean
	name: string
	onClick: Function
	size: number
	strokeWidth: number
	constructor(obj: any) {
		const clazz = 'IconParms'
		obj = valueOrDefault(obj, {})
		this.absoluteStrokeWidth = valueOrDefault(obj.absoluteStrokeWidth, false)
		this.clazz = valueOrDefault(obj.clazz, '')
		this.color = obj.color
		this.isNav = valueOrDefault(obj.isNav, false)
		this.name = strRequired(obj.name, clazz, 'name')
		this.onClick = valueOrDefault(obj.onClick, () => {})
		this.size = valueOrDefault(obj.size, 24)
		this.strokeWidth = valueOrDefault(obj.strokeWidth, 1)

		// derived
		if (this.isNav) this.clazz += ' text-nav hover:text-nav-hover'
	}
}
