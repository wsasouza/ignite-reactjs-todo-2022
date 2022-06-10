import { TaskEmpty } from './TaskEmpty';
import { TaskItem } from './TaskItem';

import styles from './TaskList.module.css';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
}

interface TaskListProps {
  tasks: Task[];
  toggleTaskDone: (id: string) => void;
  removeTask: (id: string) => void;
}

export function TaskList({ tasks, toggleTaskDone, removeTask }: TaskListProps) {
  const hasTask = tasks.length !== 0;

  const taskCompleted = tasks.reduce((completed, task) => {
    return task.done ? completed + 1 : completed;
  }, 0);

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.taskCreated}>
          <p>Tarefas criadas</p>
          <span>{tasks.length}</span>
        </div>

        <div className={styles.taskCompleted}>
          <p>Tarefas concluídas</p>
          {hasTask ? (
            <span>{`${taskCompleted} de ${tasks.length}`}</span>
          ) : (
            <span>{taskCompleted}</span>
          )}
        </div>
      </header>

      {hasTask ? (
        <main className={styles.taskList}>
          {tasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                toggleTaskDone={toggleTaskDone}
                removeTask={removeTask}
              />
            );
          })}
        </main>
      ) : (
        <TaskEmpty />
      )}
    </div>
  );
}
