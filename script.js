document.addEventListener("DOMContentLoaded", function() {
  // Elements
  const inputBox = document.getElementById("input-box");
  const addButton = document.querySelector("button"); // Assuming there's only one button for adding tasks
  const listContainer = document.getElementById("list-container");

  // Event listeners
  addButton.addEventListener("click", addTask);
  listContainer.addEventListener("click", handleListClick);

  // Load tasks from local storage on page load
  loadTasks();

  // Function to add a new task
  function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
      alert("You must write something!");
    } else {
      // Create the list item
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" class="toggle-checked"> ${taskText} <button class="delete-btn">&#10006;</button>`;
      listContainer.appendChild(li);
      inputBox.value = ""; // Clear input box
      saveTasks();
    }
  }

  // Function to handle clicks within the list container
  function handleListClick(e) {
    // Check if the clicked element is a delete button
    if (e.target.classList.contains('delete-btn')) {
      e.target.parentElement.remove();
      saveTasks();
    }
    // Check if the checkbox is toggled
    else if (e.target.classList.contains('toggle-checked')) {
      const taskItem = e.target.parentElement;
      if (e.target.checked) {
        taskItem.classList.add('checked');
        listContainer.appendChild(taskItem); // Move to the bottom
      } else {
        taskItem.classList.remove('checked');
      }
      saveTasks();
    }
  }

  // Function to save tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML);
  }

  // Function to load tasks from local storage
  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      listContainer.innerHTML = savedTasks;
    }
  }
});
