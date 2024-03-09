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
    const taskTypesQueryString = selectedTaskTypes.join('&taskTypes=');
    router.push(`?taskTypes=${taskTypesQueryString}`, { scroll: false});
  }, [selectedTaskTypes, router]);

  const handleToggleTaskType = (selectedTaskTypes:any) => {
    setSelectedTaskTypes(prev => {
      if (prev.includes(selectedTaskTypes)) {
        return prev.filter(t => t !== selectedTaskTypes);
      } else {
        return [...prev, selectedTaskTypes];
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
