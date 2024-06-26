'use client';

import { Box, Checkbox, Flex, Image, Modal, Popover, Select, Text, Title } from '@mantine/core';
import styles from './ModalViewTask.module.css';
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import ModalDeleteTask from '../ModalDeleteTask/ModalDeleteTask';
import ModalEditTask from '../ModalEditTask/ModalEditTask';
import { useDisclosure } from '@mantine/hooks';

interface Subtask {
  id: any;
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

interface ModalViewTaskProps {
  task: Task;
  subtasksData: Subtask[];
  opened: boolean;
  close: () => void;
  updateSubtasksOnClose: (subtasks: Subtask[]) => void;
}


const ModalViewTask = ({
  task,
  subtasksData,
  opened,
  close,
  updateSubtasksOnClose,
}: ModalViewTaskProps) => {
  const router = useRouter();
  const [subtasks, setSubtasks] = useState<Subtask[]>(subtasksData);
  const [status, setStatus] = useState(task.status);
  const completedSubtasksCount = subtasks.filter(subtask => subtask.isCompleted).length;
  const supabase = createClient();
  const [popoverIsOpened, setPopoverIsOpened] = useState(false);
  const [modalEditOpened, { open: openModalEdit, close: closeModalEdit }] = useDisclosure(false);
  const [modalDeleteOpened, { open: openModalDelete, close: closeModalDelete }] = useDisclosure(false);


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
    if (opened || modalEditOpened || modalDeleteOpened) {
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
  }, [opened, task.id, closeModalDelete, closeModalEdit]);

  useEffect(() => {
    console.log('updateSubtasksOnClose type:', typeof updateSubtasksOnClose);  // Should log "function"
    if (!opened) {
      if (typeof updateSubtasksOnClose === 'function') {
        updateSubtasksOnClose(subtasks);
      } else {
        console.error('updateSubtasksOnClose is not a function, actual type:', typeof updateSubtasksOnClose);
      }
    }
  }, [opened, subtasks, updateSubtasksOnClose]);
  

  const handleCheckboxChange = async (id: number) => {
    const updatedSubtasks = subtasks.map(subtask =>
        subtask.id === id ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
    );

    setSubtasks(updatedSubtasks);

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
    openModalEdit();
    setPopoverIsOpened(false);
}

const handleDeleteClick = () => {
    openModalDelete();
    setPopoverIsOpened(false);
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
        
        <Popover.Dropdown className={styles.editDeleteDropdown}>
          <Text className={styles.editText} onClick={handleEditClick}>Edit Task</Text>
          <Text className={styles.deleteText} onClick={handleDeleteClick}>Delete Task</Text>
        </Popover.Dropdown>
        </Popover>
      </Flex>

      <Modal 
        classNames={{body: styles.modalController}}
        opened={modalEditOpened} 
        onClose={closeModalEdit}
        centered 
        withCloseButton={false}
      >
        <Suspense>
          <ModalEditTask
            task={task}
            subtasks={subtasks}
            closeModalEdit={closeModalEdit}
            close={close}
          />
        </Suspense>
      </Modal>
      
      <Modal 
        classNames={{body: styles.modalController}}
        opened={modalDeleteOpened} 
        onClose={closeModalDelete}
        centered 
        withCloseButton={false}
      >
        <ModalDeleteTask
          closeModalDelete={closeModalDelete}
          close={close}
        />
      </Modal>

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
        classNames={{ 
          label: styles.viewTaskStatusSelectLabel,
          input: styles.viewTaskStatusSelectInput,
          dropdown: styles.viewTaskStatusSelectDropdown,
        }}
        label="Current Status"
        value={status}
        onChange={(value) => handleStatusChange(value)}
        data={['Todo', 'Doing', 'Done']}
      />
    </Box>
  );
};

export default ModalViewTask;
