'use client';

import { Box, Button, ButtonGroup, Text, Title } from '@mantine/core';
import { createClient } from '@/utils/supabase/client';

const ModalDeleteTask = () => {
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
      console.log('Task and all related subtasks have been deleted successfully!');
    }
  };

  return (
    <Box>
      <Title order={3}>Delete this task</Title>
      <Text>
        Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.
      </Text>
      <ButtonGroup>
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
        <Button>
          Cancel
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default ModalDeleteTask;
