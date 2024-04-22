'use client';

import { Box, Button, Text, Title } from '@mantine/core';
import { createClient } from '@/utils/supabase/client';
import styles from './ModalDeleteTask.module.css';

interface ModalDeleteTaskProps {
  closeModalDelete: () => void;
  close: () => void;
}

const ModalDeleteTask = ({ closeModalDelete, close } : ModalDeleteTaskProps) => {
  const searchParams = new URLSearchParams(window.location.search);
  const searchTaskId = searchParams.get('taskID');
  const supabase = createClient();

  const handleDelete = async () => {
    if (!searchTaskId) {
      console.error('Task ID is missing');
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', searchTaskId);

    if (error) {
      console.error('Failed to delete the task:', error.message);
    } else {
      close();
      closeModalDelete();
      alert('Task been deleted successfully!');
    }
  };

  return (
    <Box className={styles.modalDeleteTask}>
      <Title className={styles.modalTitle} order={3}>Delete this task</Title>
      <Text className={styles.modalDescription}>
        Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.
      </Text>
      <Box className={styles.buttonsContainer}>
        <Button
          classNames={{root: styles.deleteButtonRoot}}
          onClick={handleDelete}>
          Delete
        </Button>
        <Button
          classNames={{root: styles.cancelButtonRoot}}
          onClick={() => closeModalDelete()}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ModalDeleteTask;
