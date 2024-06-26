'use client'

import { Box, Button, CloseButton, Select, TextInput, Textarea, Title } from '@mantine/core';
import styles from './ModalAddTask.module.css';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface ModalAddTaskProps {
  close: () => void;
  opened: boolean;
}


const ModalAddTask = ({close, opened} : ModalAddTaskProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState([{ id: Date.now(), title: '' }]);
  const [status, setStatus] = useState('');
  const [columnId, setColumnId] = useState('');
  const [taskId, setTaskId] = useState('');
  const searchParams = useSearchParams()
  const router = useRouter();
  const supabase = createClient();
 
  const searchBoardId = searchParams.get('boardID')

  const handleTitleChange = (event:any) => setTitle(event.target.value);
  const handleDescriptionChange = (event:any) => setDescription(event.target.value);
  const handleStatusChange = (value:any) => setStatus(value);

  useEffect(() => {
    const fetchColumnId = async () => {
        const { data: columnData, error: columnError } = await supabase
            .from('columns')
            .select('id')
            .eq('board_id', searchBoardId)
            .eq('name', status)
            .single();

        if (columnError) {
            console.error('Error fetching column id:', columnError);
            alert('Failed to find the appropriate column. Please try again.');
        } else if (columnData) {
            console.log('Column ID fetched:', columnData.id);
            setColumnId(columnData.id);
        }
    };

    if (status && searchBoardId) {
        fetchColumnId();
    }
  }, [status, searchBoardId]);

  const handleSubtaskChange = (id:any, value:any) => {
    const newSubtasks = subtasks.map(subtask => {
      if (subtask.id === id) {
        return { ...subtask, title: value };
      }
      return subtask;
    });
    setSubtasks(newSubtasks);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now(), title: '' }]);
  };

  const removeSubtask = (id:any) => {
    setSubtasks(subtasks.filter(subtask => subtask.id !== id));
  };

  const handleSubmit = async () => {
    if (title.trim() === '' || status.trim() === '') {
      alert('Please provide a title and select a status for the task.');
      return;
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title,
        description,
        status,
        board_id: searchBoardId,
        column_id: columnId,
      })
      .select('*');

    if (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
      return;
    }

    if (data && data.length > 0) {
      alert('Task created successfully!');
      const taskId = data[0].id;
      setTaskId(taskId);
      close();

      const subtaskEntries = subtasks.map(subtask => ({
          title: subtask.title,
          task_id: taskId,
          isCompleted: false
      }));

      const { data: subtaskData, error: subtaskError } = await supabase
        .from('subtasks')
        .insert(subtaskEntries)
        .select('*')

      if (subtaskError) {
          console.error('Error inserting subtasks:', subtaskError);
          alert('Failed to add subtasks.');
      } else {
          console.log('Subtasks added successfully:', subtaskData);
      }
    } else {
        console.log('No task data returned, unable to create subtasks.');
        alert('Task created but no data returned, check database configuration.');
    }
  };

  useEffect(() => {
    if (opened) {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('taskID', taskId);
        const updatedQueryString = queryParams.toString();
        router.push(`/?${updatedQueryString}`, { scroll: false });
    } else {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.delete('taskID');
        const updatedQueryString = queryParams.toString();
        router.push(`/?${updatedQueryString}`, { scroll: false });
    }
  }, [opened, taskId, close]);

  return (
    <Box className={styles.modalAddEdit}>
      <Title className={styles.modalAddEditTitle} order={2}>
          Create Task
      </Title>

      <TextInput
        classNames={{ input : styles.addEditTitleInput, label: styles.addEditTitleInputLabel }}
        label="Title"
        placeholder="Add a title"
        value={title}
        onChange={handleTitleChange}
      />

      <Textarea
        classNames={{ input: styles.addEditDescriptionInput, label: styles.addEditDescriptionLabel }}
        label="Description"
        placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
        value={description === null ? '' : description}
        onChange={handleDescriptionChange}
      />

      
      <Box className={styles.subtasksContainer}>
        <Title className={styles.addEditCloseInputsTitle} order={4}>Subtasks</Title>
          {subtasks.map((subtask, index) => (
            <Box key={subtask.id} className={styles.addEditCloseInputsContainer}>
              <TextInput
                classNames={{ input: styles.addEditCloseInput }}
                placeholder="e.g. Research competitor pricing"
                value={subtask.title}
                onChange={(e) => handleSubtaskChange(subtask.id, e.target.value)}
              />
              <CloseButton onClick={() => removeSubtask(subtask.id)} />
            </Box>
          ))}
        <Button classNames={{ root: styles.addNewButtonRoot }} onClick={addSubtask}>+ Add New Subtask</Button>
      </Box>

      <Select
        classNames={{
          label: styles.addEditStatusSelectLabel,
          input: styles.addEditStatusSelectInput,
          dropdown: styles.addEditStatusSelectDropdown,
        }}
        label="Current Status"
        placeholder="Choose a status"
        value={status}
        onChange={handleStatusChange}
        data={['Todo', 'Doing', 'Done']}
      />

      <Button 
        classNames={{ root: styles.submitButtonRoot }} 
        onClick={handleSubmit}
      >
        Create Task
      </Button>
    </Box>
  );
}

export default ModalAddTask;
