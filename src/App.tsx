import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';

import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';
import { Task, TaskList } from './components/TaskList';

import styles from './App.module.css';

export function App() {
  const [tasks, setTasks] = useState<Task[]>(initialValue);

  useEffect(() => {
    localStorage.setItem('@todo', JSON.stringify(tasks));
  }, [tasks]);

  function initialValue() {
    const saved = localStorage.getItem('@todo');
    const initialValue = JSON.parse(saved || '[]');
    const initialValueWithDate = initialValue.map((task: Task) => {
      return { ...task, createdAt: new Date(task.createdAt) };
    });
    return initialValueWithDate || [];
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const items = Array.from(tasks);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setTasks(items);
  };

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find((task) => task.title === newTaskTitle);

    if (taskWithSameTitle) {
      toast.error(`Tarefa ${newTaskTitle} já foi cadastrada.`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      done: false,
      createdAt: new Date(),
    };

    setTasks((oldState) => [...oldState, newTask]);

    toast.info(`Tarefa ${newTask.title} foi criada.`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function handleToggleTaskDone(id: string) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const foundTask = updatedTasks.find((task) => task.id === id);

    if (!foundTask) return;

    foundTask.done = !foundTask.done;

    if (foundTask.done) {
      toast.success(`Tarefa ${foundTask.title} foi concluída.`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: string) {
    setTasks((oldState) => oldState.filter((task) => task.id !== id));

    const deletedTask = tasks.find((task) => task.id === id);

    toast.warn(`Tarefa ${deletedTask?.title} foi apagada.`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <TodoInput addTask={handleAddTask} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskList
            tasks={tasks}
            toggleTaskDone={handleToggleTaskDone}
            removeTask={handleRemoveTask}
          />
        </DragDropContext>
      </div>
    </>
  );
}
