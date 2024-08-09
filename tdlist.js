
document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('.input');
    const addButton = document.querySelector('.button');
    const todoList = document.querySelector('.todolist');
    const clearButton = document.querySelector('.clear-button');

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(function(todo) {
        addTodoToList(todo.text, todo.checked);
    });

    addButton.addEventListener('click', function() {
        const inputValue = input.value.trim();

        if (inputValue !== '') {
            addTodoToList(inputValue);
            saveTodoToLocalStorage(inputValue);
            input.value = '';
        }
    });

    todoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            const listItem = event.target.parentElement;
            removeTodoFromLocalStorage(listItem);
            listItem.remove();
        }

        if (event.target.classList.contains('checkbox')) {
            const listItem = event.target.parentElement;
            listItem.classList.toggle('checked');
            toggleTodoCheckedInLocalStorage(listItem);
        }
    });

    clearButton.addEventListener('click', function() {
        todoList.innerHTML = '';
        localStorage.removeItem('todos');
    });

    function addTodoToList(text, checked) {
        if (checked === undefined) {
            checked = false;
        }
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="radio" class="checkbox" ${checked ? 'checked' : ''}>
            <span>${text}</span>
            <button class="delete-button">Delete</button>
        `;
        if (checked) listItem.classList.add('checked');
        todoList.appendChild(listItem);
    }

    function saveTodoToLocalStorage(text) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text: text, checked: false });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function removeTodoFromLocalStorage(listItem) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const text = listItem.querySelector('span').textContent;
        const filteredTodos = todos.filter(function(todo) {
            return todo.text !== text;
        });
        localStorage.setItem('todos', JSON.stringify(filteredTodos));
    }

    function toggleTodoCheckedInLocalStorage(listItem) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const text = listItem.querySelector('span').textContent;
        const todo = todos.find(function(todo) {
            return todo.text === text;
        });
        if (todo) {
            todo.checked = !todo.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
});
