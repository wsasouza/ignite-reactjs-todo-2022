import clipboard from '../assets/clipboard.svg';

import styles from './TaskEmpty.module.css';

export function TaskEmpty() {
  return (
    <div className={styles.container}>
      <img src={clipboard} alt="imagem de uma lista vazia" />
      <p>Você ainda não tem tarefas cadastradas</p>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  );
}
