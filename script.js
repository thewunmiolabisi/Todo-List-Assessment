function updateProgressBar() {
  const todoLists = document.querySelectorAll('todo-list');
  let checkedTasks = 0;
  let totalTasks = 0;

  todoLists.forEach(todoList => {
    const checkbox = todoList.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      checkedTasks++;
    }
    totalTasks++;
  });

  const progressText = document.querySelector('.text');
  const progressBar = document.querySelector('.progress-bar-fill');

  const percentage = totalTasks > 0 ? (checkedTasks / totalTasks) * 100 : 0;
  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${percentage.toFixed(0)}% complete`;
}

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .todo-item {
          display: flex;
          align-items: center;
          padding: 10px;
          position: relative;
        }
        
        .todo-item:hover .remove-btn {
          display: block;
        }
        input[type="checkbox"] {
          appearance: none;
          outline: none;
          border-radius: 50%;
          border: 1px solid #b5e981; 
          width: 20px;
          height: 20px;
          cursor: pointer;
          margin-right: 10px;
        }
        input[type="checkbox"]:checked {
          background-color: #b5e981;
          background-image: url(check.svg);
          background-repeat: no-repeat;
          background-position: center;
          background-size: 20px;
          fill: #fff;
        }
        .todo-item {
          display: flex;
          align-items: center;
          padding:10px;
        }
        .remove-btn {
          border: none;
          background-color: transparent;
          color: red;
          font-size: 20px;
          cursor: pointer;
          margin-left: 200px;
          display: none;
        }
      </style>
      <div class="todo-item">
        <input type="checkbox">
        <span class="task-text"><slot></slot></span>
        <button class="remove-btn">
        <svg xmlns="http://www.w3.org/2000/svg" 

        height="24"
        
         viewBox="0 -960 960 960"
        
         fill = "red"
         width="24">
         <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
         </svg>
        </button>
      </div>
    `;

    this.shadowRoot.querySelector('.remove-btn').addEventListener('click', () => {
      this.remove();
      updateProgressBar(); 
    });

    this.shadowRoot.querySelector('input[type="checkbox"]').addEventListener('change', () => {
      updateProgressBar();
    });
  }
}

customElements.define('todo-list', TodoList);

document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.querySelector('.add-button');
  const addTaskButton = document.querySelector('.add-task-button');
  const taskList = document.querySelector('.task-list');

  addButton.addEventListener('click', () => {
    const addTaskDiv = document.querySelector('.add-task');
    addTaskDiv.style.display = 'flex'; 
  });

  addTaskButton.addEventListener('click', () => {
    const newTaskInput = document.getElementById('new-task-input');
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
      const todoList = document.createElement('todo-list');
      todoList.textContent = taskText;
      taskList.appendChild(todoList);
      newTaskInput.value = ''; 
      const addTaskDiv = document.querySelector('.add-task');
      addTaskDiv.style.display = 'none'; 
      updateProgressBar(); 
    }
  });
});
