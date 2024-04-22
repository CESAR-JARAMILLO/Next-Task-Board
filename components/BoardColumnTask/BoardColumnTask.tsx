'use client'

import React, { useState } from 'react';
import { Modal ,Paper, Text } from '@mantine/core';
import styles from './BoardColumnTask.module.css';
import ModalViewTask from '../ModalViewTask/ModalViewTask';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

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
  const [opened, { open, close }] = useDisclosure(false);
  const subtasks = subtasksData.filter((subtask: any) => subtask.task_id === task.id);
  const completedSubtasks = subtasks.filter(subtask => subtask.isCompleted).length;

  const handleTaskClick = () => {
    open();
    router.push(`/?taskID=${task.id}`, { scroll: false});
  }

  return (
    <>
      <Paper className={styles.columnTaskCard} onClick={handleTaskClick}>
        <Text className={styles.taskCardTitle}>{task.title}</Text>
        <Text className={styles.taskCardSubtitle}>{`${completedSubtasks} of ${subtasks.length} subtasks`}</Text>
      </Paper>
      <Modal 
        classNames={{body: styles.modalController}}
        opened={opened} 
        onClose={close}
        centered 
        withCloseButton={false}
      >
        <ModalViewTask 
          task={task} 
          close={close}
          opened={opened} 
          subtasksData={subtasks} 
        />
      </Modal>
    </>
  );
};

export default BoardColumnTask;
