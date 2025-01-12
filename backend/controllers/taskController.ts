import Task from '../models/taskModel';

//create
export const createTask = async (req: any, res: any) => {
  const { title, description, userId } = req.body;

  const task = new Task({ title, description, userId });
  await task.save();

  res.status(201).json(task);
};

//read
export const getTasks = async (req: any, res: any) => {
  const tasks = await Task.find({ userId: req.userId });
  res.status(200).json(tasks);
};

//update
export const updateTask = async (req: any, res: any) => {
  const { taskId } = req.params;
  const { title, description, isCompleted } = req.body;

  const task = await Task.findByIdAndUpdate(taskId, { title, description, isCompleted }, { new: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  res.status(200).json(task);
};

//delete
export const deleteTask = async (req: any, res: any) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndDelete(taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  res.status(200).json({ message: 'Task deleted successfully' });
};
