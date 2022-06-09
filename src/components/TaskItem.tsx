import trash from '../assets/trash.svg';

import { Task } from './TaskList';

import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: string) => void;
  removeTask: (id: string) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask }: TaskItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <input
          type="checkbox"
          name="task"
          id={task.id}
          onClick={() => toggleTaskDone(task.id)}
        />

        <span className={styles.check}></span>
        <label htmlFor={task.id}> {task.title}</label>
      </div>
      <button>
        <img
          src={trash}
          alt="deletar"
          title="Apagar tarefa"
          onClick={() => removeTask(task.id)}
        />
      </button>
    </div>
  );
}
