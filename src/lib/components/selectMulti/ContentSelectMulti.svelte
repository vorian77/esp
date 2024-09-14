<script lang="ts">
	import { State } from '$comps/app/types.appState'
	import { DataObj, DataObjData } from '$utils/types'

	export let state: State
	export let component: string
	export let dataObj: DataObj | undefined = undefined
	export let dataObjData: DataObjData | undefined = undefined

	console.log('ContentSelectMulti.state', state)
</script>

<h1>Layout Select Multiple!!!</h1>
