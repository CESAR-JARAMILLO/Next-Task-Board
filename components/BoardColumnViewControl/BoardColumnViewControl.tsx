'use client';

import { Box, Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import data from '@/data/data.json';
import { useRouter } from 'next/navigation';
import styles from './BoardColumnViewControl.module.css';

const BoardColumnViewControl = () => {
  const router = useRouter();
  const [selectedTaskTypes, setSelectedTaskTypes] = useState([data.boards[0].columns[0].name]);

  useEffect(() => {
    const taskTypesQueryString = selectedTaskTypes.join(',');
    const queryParams = new URLSearchParams(window.location.search);

    queryParams.set('taskTypes', taskTypesQueryString);
    const updatedQueryString = queryParams.toString();

    router.push(`/?${updatedQueryString}`, { scroll: false });
  }, [selectedTaskTypes, router]);

  const handleToggleTaskType = (taskType:any) => {
    setSelectedTaskTypes((prev) => {
      if (prev.includes(taskType)) {
        return prev.filter((t) => t !== taskType);
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
