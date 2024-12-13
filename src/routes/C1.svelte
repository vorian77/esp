<script lang="ts">
	import { Todo, TodoList } from './state.svelte';
	import { getContext } from 'svelte';

	let value = '';
	let list = getContext<TodoList>('list');
</script>

<h1>Component-1</h1>

dataObjValue: {list.dataObj.value}

<!-- {#each list.todos as todo (todo.id)}
	<p>{todo.text}</p>
{/each} -->

<!-- <input type="text" bind:value /> -->

<!-- <button onclick={() => list.add(value)}>Add todo</button> -->

<button onclick={() => list.dataObj.increment()}>Update dataObj</button>
