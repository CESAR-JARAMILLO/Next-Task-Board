'use client';

import { Box, Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import data from '@/data/data.json';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './BoardColumnViewControl.module.css';

const BoardColumnViewControl = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const searchTaskTypes = searchParams.get('taskTypes')

  const initialTaskTypes = searchTaskTypes ? searchTaskTypes.split(',') : [];
  const [selectedTaskTypes, setSelectedTaskTypes] = useState(initialTaskTypes);

  useEffect(() => {
    const taskTypesQueryString = selectedTaskTypes.join(',');
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('taskTypes', taskTypesQueryString);

    router.replace(newUrl.toString(),  { scroll: false });
    
  }, [selectedTaskTypes, router]);

  const handleToggleTaskType = (taskType: string) => {
    setSelectedTaskTypes((prev:any) => {
      if (prev.includes(taskType)) {
        return prev.filter((t:any) => t !== taskType);
      } else {
        return [...prev, taskType];
      }
    });
  };

  return (
    <Box id='board-column-view-control'>
      {data.boards[0].columns.map((column) => (
        <Button
          classNames={{ root: styles.columnControlButton }}
          mx={10}
          key={column.name}
          onClick={() => handleToggleTaskType(column.name)}
          style={{
            background: selectedTaskTypes.includes(column.name) ? '#635FC7' : '',
            color: selectedTaskTypes.includes(column.name) ? '#FFF' : ''
          }}
        >
          {column.name}
        </Button>
      ))}
    </Box>
  );
};

export default BoardColumnViewControl;
