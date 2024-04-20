'use client';

import { Box, Checkbox, Flex, Image, Popover, Select, Text, Title } from '@mantine/core';
import styles from './ModalViewTask.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import ModalController from '../ModalController/ModalController';
import ModalAddEdit from '../ModalEditTask/ModalEditTask';

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
  subtasksData: Subtask[];
  opened: boolean;
}


const ModalViewTask = ({
  task,
  subtasksData,
  opened
}: ModalViewTaskProps) => {
  const router = useRouter();
  const [subtasks, setSubtasks] = useState<Subtask[]>(subtasksData);
  const [status, setStatus] = useState(task.status);
  const completedSubtasksCount = subtasks.filter(subtask => subtask.isCompleted).length;
  const supabase = createClient();
  const [modalEditIsOpened, setModalEditIsOpened] = useState(false);
  const [popoverIsOpened, setPopoverIsOpened] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        const { data: subtasksData, error: subtasksError } = await supabase
            .from('subtasks')
            .select('*')
            .eq('task_id', task.id);

        const { data: taskData, error: taskError } = await supabase
            .from('tasks')
            .select('status')
            .eq('id', task.id)
            .single();

        if (subtasksError) {
            console.error('Error fetching subtasks:', subtasksError);
        } else {
            setSubtasks(subtasksData);
        }

        if (taskError) {
            console.error('Error fetching task status:', taskError);
        } else {
            setStatus(taskData.status);
        }
    };

    if (opened) {
        fetchData();
    }
}, [opened, task.id]);

  useEffect(() => {
    if (opened) {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('taskID', task.id);
        const updatedQueryString = queryParams.toString();
        router.push(`/?${updatedQueryString}`, { scroll: false });
    } else {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.delete('taskID');
        const updatedQueryString = queryParams.toString();
        router.push(`/?${updatedQueryString}`, { scroll: false });
    }
  }, [opened, task.id]);

  const handleCheckboxChange = async (id: number) => {
    const updatedSubtasks = subtasks.map(subtask =>
        subtask.id === id ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
    );

    const { error } = await supabase
        .from('subtasks')
        .update({ isCompleted: !subtasks.find(subtask => subtask.id === id)?.isCompleted })
        .eq('id', id);

    if (error) {
        console.error('Error updating subtask:', error);
        alert('Failed to update task. Please try again.');
    } else {
        setSubtasks(updatedSubtasks);
    }
  };

  const handleStatusChange = async (newStatus: string | null) => {
    if (newStatus === null) {
      console.log("Selection was cleared.");
      return;
    }

    setStatus(newStatus);

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', task.id);

    if (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status. Please try again.');
      setStatus(task.status);
    }
  };

  const handleEditClick = () => {
    setModalEditIsOpened(true);
    setPopoverIsOpened(false);
    console.log('Edit clicked');
}


  return (
    <Box  id="modal-view-task" className={styles.viewTask}>
      <Flex align={'center'} justify={'space-between'}>
        <Title className={styles.viewTaskTitle} order={2}>
          {task.title}
        </Title>

        <Popover
          opened={popoverIsOpened}
          width={192}
          onClose={() => setPopoverIsOpened(false)}
        >
          <Popover.Target>
            <Image onClick={() => setPopoverIsOpened(true)} className={styles.headerElipses} src={'/assets/icon-vertical-ellipsis.svg'} />
          </Popover.Target>
        
        <Popover.Dropdown>
          <Text onClick={handleEditClick}>Edit</Text>
          <Text>Delete</Text>
        </Popover.Dropdown>
        </Popover>
      </Flex>

      <ModalController isOpened={modalEditIsOpened} onClose={() => setModalEditIsOpened(false)}>
        <ModalAddEdit 
        task={task}
        subtasks={subtasks}
        />
      </ModalController>

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
        value={status}
        onChange={(value) => handleStatusChange(value)}
        data={['Todo', 'Doing', 'Done']}
      />
    </Box>
  );
};

export default ModalViewTask;
