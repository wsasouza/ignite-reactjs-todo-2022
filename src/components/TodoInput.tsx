import { useState, FormEvent, ChangeEvent } from 'react';
import { PlusCircle } from 'phosphor-react';

import styles from './TodoInput.module.css';

interface TodoInputProps {
  addTask: (task: string) => void;
}

export function TodoInput({ addTask }: TodoInputProps) {
  const [task, setTask] = useState('');

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    const taskFormatted = task.trim();

    if (taskFormatted.length > 0) {
      addTask(taskFormatted);
      setTask('');
    }
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  const isNewTaskEmpty = task.length === 0;

  return (
    <form onSubmit={handleAddNewTask} className={styles.container}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={task}
        onChange={handleNewTaskChange}
      />
      <button disabled={isNewTaskEmpty} type="submit">
        Criar
        <PlusCircle size={16} weight="bold" />
      </button>
    </form>
  );
}
