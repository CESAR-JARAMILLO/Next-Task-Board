'use client'

import React, { useState } from 'react';
import { Paper, Text } from '@mantine/core';
import styles from './BoardColumnTask.module.css';
import ModalController from '../ModalController/ModalController';
import ModalViewTask from '../ModalViewTask/ModalViewTask';
import { useRouter } from 'next/navigation';

interface BoardColumnTaskProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
    subtasks: any;
  };
  subtasksData: any;
}

const BoardColumnTask = ({ task, subtasksData }: BoardColumnTaskProps) => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const subtasks = subtasksData.filter((subtask: any) => subtask.task_id === task.id);

  const handleTaskClick = () => {
    setOpened(true)
    router.push(`/?taskID=${task.id}`, { scroll: false});
  }

  return (
    <>
      <Paper className={styles.columnTaskCard} onClick={handleTaskClick}>
        <Text className={styles.taskCardTitle}>{task.title}</Text>
        <Text className={styles.taskCardSubtitle}>{`0 of ${subtasks.length} subtasks`}</Text>
      </Paper>
      <ModalController isOpened={opened} onClose={() => setOpened(false)}>
        <ModalViewTask task={task} subtasksData={subtasks} />
      </ModalController>
    </>
  );
};

export default BoardColumnTask;
