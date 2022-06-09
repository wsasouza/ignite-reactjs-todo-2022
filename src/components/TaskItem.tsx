import trash from '../assets/trash.svg';

import styles from './TaskItem.module.css';

export function TaskItem() {
  return (
    <div className={styles.container}>
      <label className={styles.task}>
        <input type="checkbox" name="task" />
        <span className={styles.check}></span>
        Minha primeira task, eu vi um pouco de porn, mesmo sabendo que isso está
        me fazendo mal. Vou parar com isso.
      </label>
      <button>
        <img src={trash} alt="deletar" title="Apagar tarefa" />
      </button>
    </div>
  );
}
