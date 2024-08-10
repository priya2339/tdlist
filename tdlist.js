

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
        const listItem = event.target.parentElement;

        if (event.target.classList.contains('delete-button')) {
            removeTodoFromLocalStorage(listItem);
            listItem.remove();
        }

        if (event.target.classList.contains('checkbox')) {
            listItem.classList.toggle('checked');
            toggleTodoCheckedInLocalStorage(listItem);
        }

        if (event.target.classList.contains('edit-button')) {
            const span = listItem.querySelector('span');
            const newText = prompt('Edit your task:', span.textContent);
            if (newText !== null && newText.trim() !== '') {
                updateTodoInLocalStorage(listItem, newText.trim());
                span.textContent = newText.trim();
            }
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
            <input type="checkbox" class="checkbox" ${checked ? 'checked' : ''}>
            <span>${text}</span>
            <button class="edit-button">Edit</button>
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

    function updateTodoInLocalStorage(listItem, newText) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const text = listItem.querySelector('span').textContent;
        const todo = todos.find(function(todo) {
            return todo.text === text;
        });
        if (todo) {
            todo.text = newText;
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
});
