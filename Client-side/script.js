et tasks = [];
let editIndex = -1;

// Function to open the task modal
function openTaskModal(type, index = -1) {
    document.getElementById("taskModal").style.display = "block";
    if (type === 'new') {
        document.getElementById("modalTitle").innerText = "New Task";
        document.getElementById("taskForm").reset();
        editIndex = -1;
    } else if (type === 'edit') {
        document.getElementById("modalTitle").innerText = "Edit Task";
        const task = tasks[index];
        document.getElementById("assignedTo").value = task.assignedTo;
        document.getElementById("status").value = task.status;
        document.getElementById("dueDate").value = task.dueDate;
        document.getElementById("priority").value = task.priority;
        document.getElementById("description").value = task.description;
        editIndex = index;
    }
}

// Function to close the modal
function closeModal() {
    document.getElementById("taskModal").style.display = "none";
}

// Function to handle form submission
document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const newTask = {
        assignedTo: document.getElementById("assignedTo").value,
        status: document.getElementById("status").value,
        dueDate: document.getElementById("dueDate").value,
        priority: document.getElementById("priority").value,
        description: document.getElementById("description").value
    };
if (editIndex >= 0) {
        tasks[editIndex] = newTask;
    } else {
        tasks.push(newTask);
    }

    displayTasks();
    closeModal();
});

// Function to display tasks in the table
function displayTasks() {
    const tbody = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = task.assignedTo;
        row.insertCell(1).innerText = task.status;
        row.insertCell(2).innerText = task.dueDate;
        row.insertCell(3).innerText = task.priority;
        const commentsCell = row.insertCell(4);
        commentsCell.innerHTML = `<button onclick="openTaskModal('edit', ${index})">Edit</button>
                                   <button onclick="confirmDelete(${index})">Delete</button>`;
    });
}

// Function to confirm deletion of a task
function confirmDelete(index) {
    document.getElementById("deleteModal").style.display = "block";
    document.getElementById("confirmDelete").onclick = function() {
        tasks.splice(index, 1);
        displayTasks();
        closeDeleteModal();
    }
}

// Function to close the delete modal
function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
}