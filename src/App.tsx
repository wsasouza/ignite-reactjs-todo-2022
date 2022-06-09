import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';

import styles from './App.module.css';
import { TaskList } from './components/TaskList';

export function App() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <TodoInput />
        <TaskList />
      </div>
    </>
  );
}
