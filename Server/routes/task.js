
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  assignedTo: String,
  status: String,
  dueDate: Date,
  priority: String,
});

const Task = mongoose.model("Task", taskSchema);

// **1. Add Task**
app.post("/api/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).send(newTask);
});

// **2. View Tasks**
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});


//**3. Edit Task**
app.put("/api/task/:id", async (req, res) => {
  const taskId = req.params.id;
  const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  if (updatedTask) {
    res.send(updatedTask);
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

// **4. Delete Task**
app.delete("/api/task/:id", async (req, res) => {
  const taskId = req.params.id;
  const deletedTask = await Task.findByIdAndRemove(taskId);
  if (deletedTask) {
    res.send(deletedTask);
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


