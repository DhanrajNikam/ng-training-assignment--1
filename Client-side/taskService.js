const API_URL = "http://localhost:3000/tasks"; // Adjust as needed

export const addTask = async (task) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
};

export const getTasks = async () => {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    // Code to display tasks in the UI
};

export const editTask = async (id, updatedTask) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
    });
    return response.json();
};
