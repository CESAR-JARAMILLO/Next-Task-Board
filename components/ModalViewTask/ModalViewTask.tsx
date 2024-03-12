'use client';
import { Box, Checkbox, Select, Text, Title } from '@mantine/core';
import styles from './ModalViewTask.module.css';
import { useState } from 'react';

interface Subtask {
  id: number;
  label: string;
  checked: boolean;
}

const ModalViewTask = () => {
  const initialSubtasks: Subtask[] = [
    { id: 1, label: 'Research competitor pricing and business models', checked: false },
    { id: 2, label: 'Outline a business model that works for our solution', checked: false },
    { id: 3, label: 'Talk to potential customers about our proposed solution and ask for fair price expectancy', checked: false },
  ];

  const [subtasks, setSubtasks] = useState<Subtask[]>(initialSubtasks);

  const handleCheckboxChange = (id: number) => {
    setSubtasks(subtasks =>
      subtasks.map(subtask =>
        subtask.id === id ? { ...subtask, checked: !subtask.checked } : subtask,
      ),
    );
  };

  const completedSubtasksCount = subtasks.filter(subtask => subtask.checked).length;

  return (
    <Box id="modal-view-task" className={styles.viewTask}>
      <Title className={styles.viewTaskTitle} order={2}>
        Research pricing points of various competitors and trial different business models
      </Title>

      <Text className={styles.viewTaskDescription}>
        We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.
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
                label: subtask.checked ? styles.viewSubtaskCheckboxLabelChecked : styles.viewSubtaskCheckboxLabel,
              }}
              checked={subtask.checked}
              onChange={() => handleCheckboxChange(subtask.id)}
              key={subtask.id}
              label={subtask.label}
            />
          ))}
        </Box>
      </Box>

      <Select
        classNames={{ label: styles.viewTaskStatusSelectLabel }}
        label="Current Status"
        placeholder="Choose a status"
        data={['Todo', 'Doing', 'Done']}
      />
    </Box>
  );
};

export default ModalViewTask;
