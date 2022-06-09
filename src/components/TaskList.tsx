import { TaskItem } from './TaskItem';

import styles from './TaskList.module.css';

export function TaskList() {
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
        <TaskItem />
      </main>
    </div>
  );
}
