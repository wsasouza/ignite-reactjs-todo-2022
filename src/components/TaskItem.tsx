import { Trash } from 'phosphor-react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Task } from './TaskList';

import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: string) => void;
  removeTask: (id: string) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask }: TaskItemProps) {
  const createdDateFormatted = format(
    task.createdAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const createdDateRelativeToNow = formatDistanceToNow(task.createdAt, {
    locale: ptBR,
    addSuffix: true,
  });

  return (
    <div className={styles.container}>
      <div className={styles.marker}>
        <label
          htmlFor={task.id}
          className={task.done ? styles.taskMarkerDone : styles.taskMarker}
        ></label>
      </div>
      <div className={styles.text}>
        <input
          type="text"
          className={task.done ? styles.taskTextDone : styles.taskText}
          id={task.id}
          onClick={() => toggleTaskDone(task.id)}
          value={task.title}
          title="tarefa"
          readOnly
        />
      </div>
      <div className={styles.trash}>
        <button
          type="button"
          className={styles.taskDelete}
          onClick={() => removeTask(task.id)}
          title="Apagar tarefa"
        >
          <Trash size={20} />
        </button>
      </div>
      <div className={styles.taskTime}>
        <time
          title={createdDateFormatted}
          dateTime={task.createdAt.toISOString()}
        >
          {createdDateRelativeToNow}
        </time>
      </div>
    </div>
  );
}
