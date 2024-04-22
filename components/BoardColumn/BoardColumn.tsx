  import React from 'react';
  import BoardColumnTask from '../BoardColumnTask/BoardColumnTask';
  import { Box, Flex, Text } from '@mantine/core';
  import styles from './BoardColumn.module.css';
  import { createClient } from '@/utils/supabase/server';

  interface BoardColumnProps {
    taskType: string;
    boardID: string | null;
    taskID: string | null;
  }

  async function BoardColumn ({ taskType, boardID, taskID }: BoardColumnProps) {
    const supabase = createClient();

    const { data: tasksData, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', taskType)
      .eq('board_id', boardID)
    
      const { data: subTasksData, error: subTasksError } = await supabase
      .from('subtasks')
      .select('*')

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


    if (!tasksData) {
      return <div>Column not found</div>;
    }

    if (!subTasksData) {
      return
    }

    return (
      <>
        <Flex className={styles.boardColumn}>
          <Box className={styles.columnContent}>
            <Flex className={styles.columnTaskType}>
              <Box className={taskTypeCircleClass()} />
              <Text className={styles.taskTypeText}>{`${taskType} (${tasksData.length})`}</Text>
            </Flex>
            {tasksData?.map((task) => (
              <BoardColumnTask key={task.id} task={task} subtasksData={subTasksData} />
            ))}
          </Box>
        </Flex>
      </>
    );
  };

  export default BoardColumn;
