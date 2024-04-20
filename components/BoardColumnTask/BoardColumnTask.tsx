'use client'

import React, { useState } from 'react';
import { Paper, Text } from '@mantine/core';
import styles from './BoardColumnTask.module.css';
import ModalController from '../ModalController/ModalController';
import ModalViewTask from '../ModalViewTask/ModalViewTask';
import { useRouter } from 'next/navigation';

interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
  task_id: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

interface BoardColumnTaskProps {
  task: Task;
  subtasksData: Subtask[];
}

const BoardColumnTask = ({ task, subtasksData }: BoardColumnTaskProps) => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const subtasks = subtasksData.filter((subtask: any) => subtask.task_id === task.id);
  const completedSubtasks = subtasks.filter(subtask => subtask.isCompleted).length;

  const handleTaskClick = () => {
    setOpened(true)
    router.push(`/?taskID=${task.id}`, { scroll: false});
  }

  return (
    <>
      <Paper className={styles.columnTaskCard} onClick={handleTaskClick}>
        <Text className={styles.taskCardTitle}>{task.title}</Text>
        <Text className={styles.taskCardSubtitle}>{`${completedSubtasks} of ${subtasks.length} subtasks`}</Text>
      </Paper>
      <ModalController isOpened={opened} onClose={() => setOpened(false)}>
        <ModalViewTask task={task} opened={opened} subtasksData={subtasks} />
      </ModalController>
    </>
  );
};

export default BoardColumnTask;
