'use client';

import { Box, Button, CloseButton, Select, TextInput, Textarea, Title } from '@mantine/core';
import styles from './ModalEditTask.module.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface Subtask {
  id: number | null;
  title: string;
  isCompleted: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface ModalEditTaskProps {
  task?: Task;
  subtasks?: Subtask[];
}

const ModalEditTask = ({ task, subtasks }: ModalEditTaskProps) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<string | null>(task?.status || null);
  const [taskSubtasks, setTaskSubtasks] = useState<Subtask[]>(subtasks || []);
  const [deletedSubtasks, setDeletedSubtasks] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const supabase = createClient();
  const searchBoardId = searchParams.get('boardID');
  const [columnId, setColumnId] = useState<number | null>(null);

  useEffect(() => {
    if (status && searchBoardId) {
      const fetchColumnId = async () => {
        const { data, error } = await supabase
          .from('columns')
          .select('id')
          .eq('board_id', searchBoardId)
          .eq('name', status)
          .single();

        if (error) {
          console.error('Error fetching column id:', error);
          alert('Failed to find the appropriate column.');
        } else {
          setColumnId(data.id);
        }
      };

      fetchColumnId();
    }
  }, [status, searchBoardId]);

  useEffect(() => {
    if (task && subtasks) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setTaskSubtasks(subtasks.map(subtask => ({
        id: subtask.id,
        title: subtask.title,
        isCompleted: subtask.isCompleted
      })));
    }
  }, [task, subtasks]);

  const handleSubtaskChange = (index: number, value: string) => {
    const newSubtasks = [...taskSubtasks];
    newSubtasks[index] = { ...newSubtasks[index], title: value };
    setTaskSubtasks(newSubtasks);
  };

  const addSubtask = () => {
    setTaskSubtasks([...taskSubtasks, { id: null, title: '', isCompleted: false }]);
  };

  const removeSubtask = (id: number | null) => {
    if (id !== null) {
      setDeletedSubtasks(prev => [...prev, id]);
    }
    setTaskSubtasks(taskSubtasks.filter(subtask => subtask.id !== id));
  };

  const handleEditSubmit = async () => {
    const updateData = { title, description, status, column_id: columnId };
    const { error } = await supabase.from('tasks').update(updateData).eq('id', task?.id);
    if (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task.');
      return;
    }

    // Handle subtasks updates and insertions
    const updates = taskSubtasks.filter(subtask => subtask.id).map(subtask => ({
      id: subtask.id,
      changes: { title: subtask.title, isCompleted: subtask.isCompleted }
    }));
    const inserts = taskSubtasks.filter(subtask => subtask.id === null).map(subtask => ({
      title: subtask.title,
      isCompleted: subtask.isCompleted,
      task_id: task?.id
    }));

    // Execute updates, inserts, and deletions
    try {
      await Promise.all(updates.map(subtask =>
        supabase.from('subtasks').update(subtask.changes).eq('id', subtask.id)
      ));
      if (inserts.length > 0) {
        await supabase.from('subtasks').insert(inserts);
      }
      if (deletedSubtasks.length > 0) {
        await supabase.from('subtasks').delete().in('id', deletedSubtasks);
      }
      console.log('Task and subtasks updated successfully!');
      alert('Task and subtasks updated successfully!');
    } catch (err) {
      console.error('Error performing subtask updates:', err);
      alert('Failed to update subtasks.');
    }
  };

  return (
    <Box className={styles.modalAddEdit}>
      <Title className={styles.modalAddEditTitle} order={2}>
        Edit Task
      </Title>

      <TextInput
        classNames={{ input : styles.addEditTitleInput, label: styles.addEditTitleInputLabel }}
        label="Title"
        placeholder="Add a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        classNames={{ input: styles.addEditDescriptionInput, label: styles.addEditDescriptionLabel }}
        label="Description"
        placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Box>
        <Title className={styles.addEditCloseInputsTitle} order={4}>Subtasks</Title>
        {taskSubtasks.map((subtask, index) => (
          <Box key={index} className={styles.addEditCloseInputsContainer}>
            <TextInput
              classNames={{ input: styles.addEditCloseInput }}
              placeholder="e.g. Research competitor pricing"
              value={subtask.title}
              onChange={(e) => handleSubtaskChange(index, e.target.value)}
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
          onChange={(value) => setStatus(value)}
          data={['Todo', 'Doing', 'Done']}
        />

      <Button 
        classNames={{ root: styles.submitButtonRoot }} 
        onClick={handleEditSubmit}
      >
        Save Changes
      </Button>
    </Box>
  );
}

export default ModalEditTask;
