import { Draggable, Droppable } from 'react-beautiful-dnd';

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

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  borderTop: isDragging ? '1px solid #d9d9d9' : 'none',
  borderRadius: '8px',
  ...draggableStyle,
});

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
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              className={styles.taskList}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <TaskItem
                          key={task.id}
                          task={task}
                          toggleTaskDone={toggleTaskDone}
                          removeTask={removeTask}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : (
        <TaskEmpty />
      )}
    </div>
  );
}
