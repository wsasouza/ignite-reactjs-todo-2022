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
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.taskCreated}>
          <p>Tarefas criadas</p>
          <span>5</span>
        </div>

        <div className={styles.taskCompleted}>
          <p>Tarefas concluídas</p>
          <span>2 de 5</span>
        </div>
      </header>

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
    </div>
  );
}
