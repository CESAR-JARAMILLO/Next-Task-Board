import React from 'react';
import BoardColumnTask from '../BoardColumnTask/BoardColumnTask';
import data from '@/data/data.json';
import { Box, Flex, Text } from '@mantine/core';
import styles from './BoardColumn.module.css';

interface BoardColumnProps {
  taskType: string;
}

const BoardColumn = ({ taskType }: BoardColumnProps) => {

  const column = data.boards[0].columns.find(column => column.name === taskType);

  const taskTypeCircleClass = () => {
    switch(taskType) {
      case 'Todo':
        return styles.todoTaskTypeCircle;
      case 'Doing':
        return styles.doingTaskTypeCircle;
      case 'Done':
        return styles.doneTaskTypeCircle;
      default:
        return styles.taskTypeCircle;
    }
  };


  if (!column) {
    return <div>Column not found</div>;
  }

  return (
    <>
      <Flex className={styles.boardColumn}>
        <Box className={styles.columnContent}>
          <Flex className={styles.columnTaskType}>
            <Box className={taskTypeCircleClass()} />
            <Text className={styles.taskTypeText}>{`${taskType} (${column.tasks.length})`}</Text>
          </Flex>
          {column.tasks.map((task, index) => (
            <BoardColumnTask key={index} task={task} />
          ))}
        </Box>
      </Flex>
    </>
  );
};

export default BoardColumn;
