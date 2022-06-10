import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';
import { Task, TaskList } from './components/TaskList';

import styles from './App.module.css';

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find((task) => task.title === newTaskTitle);

    if (taskWithSameTitle) {
      alert('Tarefa já cadastrada');
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      done: false,
      createdAt: new Date(),
    };

    setTasks((oldState) => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: string) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const foundTask = updatedTasks.find((task) => task.id === id);

    if (!foundTask) return;

    foundTask.done = !foundTask.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: string) {
    setTasks((oldState) => oldState.filter((task) => task.id !== id));
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <TodoInput addTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          toggleTaskDone={handleToggleTaskDone}
          removeTask={handleRemoveTask}
        />
      </div>
    </>
  );
}
