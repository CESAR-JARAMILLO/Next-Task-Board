'use client';
import { Box, Checkbox, Select, Text, Title } from '@mantine/core';
import styles from './ModalViewTask.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Subtask {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface ModalViewTaskProps {
  task: Task;
  subtasksData: Subtask[]; // Ensure this matches the type you expect
}


const ModalViewTask = ({task, subtasksData} : ModalViewTaskProps) => {
  const router = useRouter();
  const [subtasks, setSubtasks] = useState<Subtask[]>(subtasksData);
  const completedSubtasksCount = subtasks.filter(subtask => subtask.isCompleted).length;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    queryParams.set('taskID', task.id);
    const updatedQueryString = queryParams.toString();

    router.push(`/?${updatedQueryString}`, { scroll: false });
  }, [ router]);


  const handleCheckboxChange = (id: number) => {
    setSubtasks(subtasks =>
      subtasks.map(subtask =>
        subtask.id === id ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask,
      ),
    );
  };


  return (
    <Box id="modal-view-task" className={styles.viewTask}>
      <Title className={styles.viewTaskTitle} order={2}>
        {task.title}
      </Title>

      <Text className={styles.viewTaskDescription}>
        {task.description}
      </Text>

      <Box>
        <Title className={styles.viewSubtaskCountText} order={4}>
          Subtasks ({completedSubtasksCount} of {subtasks.length})
        </Title>
        <Box className={styles.viewSubtaskContainer}>
          {subtasks.map(subtask => (
            <Checkbox
              classNames={{
                root: styles.viewSubtaskCheckboxRoot,
                input: styles.viewSubtaskCheckboxInput,
                label: subtask.isCompleted ? styles.viewSubtaskCheckboxLabelChecked : styles.viewSubtaskCheckboxLabel,
              }}
              checked={subtask.isCompleted}
              onChange={() => handleCheckboxChange(subtask.id)}
              key={subtask.id}
              label={subtask.title}
            />
          ))}
        </Box>
      </Box>

      <Select
        classNames={{ label: styles.viewTaskStatusSelectLabel }}
        label="Current Status"
        placeholder={task.status}
        data={['Todo', 'Doing', 'Done']}
      />
    </Box>
  );
};

export default ModalViewTask;
