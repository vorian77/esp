export class Todo {
	done = $state(false)
	id = $state(Math.random())
	text = $state()

	constructor(text: string) {
		this.text = text
	}

	reset = () => {
		this.done = false
		this.text = ''
	}
}

export class TodoList {
	dataObj = new DataObj()
	todos = $state<Todo[]>([])
	constructor() {
		this.add('learn svelte')
		this.add('learn sapper')
		this.add('build something awesome')
	}

	add = (text: string) => {
		this.todos = [...this.todos, new Todo(text)]
	}

	remove = (todo: Todo) => {
		this.todos = this.todos.filter((t) => t !== todo)
	}
}

export class DataObj {
	value: number = $state(0)
	constructor() {}
	increment = () => {
		this.value++
	}
}
