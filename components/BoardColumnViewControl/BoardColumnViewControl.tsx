'use client';

import { Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import data from '@/data/data.json';
import { useRouter } from 'next/navigation';

const BoardGridSegmentedControl = () => {
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
    <>
      {data.boards[0].columns.map((column) => (
        <Button
        mx={10}
          key={column.name}
          onClick={() => handleToggleTaskType(column.name)}
          style={{ background: selectedTaskTypes.includes(column.name) ? 'grey' : 'transparent' }}
        >
          {column.name}
        </Button>
      ))}
    </>
  );
};

export default BoardGridSegmentedControl;
