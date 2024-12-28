//VARIABLES
const todos = [];
const addTodoBtn = document.querySelector('.add-todo');
const todoInput = document.querySelector('.todo-input');
const container = document.querySelector('.todos-container')

//FUNCTIONS
function addTodo(text) {
    const todo = {
        id: `${Date.now()}`,
        text,
        completed: false
    }
    todos.push(todo);
    localStorage.setItem(`${todo.id}`, JSON.stringify(todo))
    
}
function deleteTodo(id) {
    todos.forEach((todo, index) => {
        if(todo.id === id ) {
            todos.splice(index, 1) 
        }
       
    })
     for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let todo = localStorage.getItem(key);
        todo = JSON.parse(todo);
        if(todo.id === id) {
            localStorage.removeItem(key)
        }
     }
    
}
function completeTodo (id) {
    todos.forEach(todo => {
			if (todo.id === id) {
                todo.completed = true;
			}
		})
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i)
			let todo = localStorage.getItem(key)
			todo = JSON.parse(todo)
			if (todo.id === id) {
				localStorage.removeItem(key)
                todo.completed = true;
                localStorage.setItem(`${todo.id}`, JSON.stringify(todo));
			}
		}
}

function render() {
    let html = ''; 
    todos.forEach(todo => {
        if(todo.completed === false) {
            html += `
                <div class="todo">
                <div class="todo-left"><img data-id=${todo.id} src="./content/square.svg" alt="" class="check"><span>${todo.text}</span></div>
                <img data-id=${todo.id} src="/content/trash.svg" alt="" class="delete">
            </div>
            `
        } else {
            html += `
                <div class="todo">
                <div class="todo-left"><img src="./content/square-check.svg" alt="" class="check"><span style='text-decoration: line-through;'>${todo.text}</span></div>
                <img data-id=${todo.id} src="./content/trash.svg" alt="" class="delete">
            </div>
            `
        }
    })
    container.innerHTML = html;
}


//LISTENERS

window.onload = ()=> {
         for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let todo = localStorage.getItem(key);
            todo = JSON.parse(todo);
            todos.push(todo);
           
         }
          render()
}


addTodoBtn.addEventListener('click', ()=> {
    if(todoInput.value === ''){
        return;
    }
    let text = todoInput.value;
    addTodo(text);
    todoInput.value ='';
    render();
}) 

container.addEventListener('click', (event)=> {
    if(event.target.className === 'delete') {
        let id = event.target.dataset.id;
        deleteTodo(id);
        render()
    } else if(event.target.className === 'check') {
        let id = event.target.dataset.id;
        completeTodo(id);
        render()
    }
})

window.addEventListener('keyup', () => {
    if(event.code == 'Enter'){
        if (todoInput.value === '') {
					return
				}
				let text = todoInput.value
				addTodo(text)
				todoInput.value = ''
				render()
    }
})






