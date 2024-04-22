import { Box, Button, Flex, Image, Modal, Text } from '@mantine/core';
import styles from './LayoutHeader.module.css';
import ModalController from '../ModalController/ModalController';
import { useState, Suspense } from 'react';
import ModalAddTask from '../ModalAddTask/ModalAddTask';
import { useDisclosure } from '@mantine/hooks';

interface LayoutHeaderProps {
  opened: boolean;
  toggle: () => void;
}

const LayoutHeader = ({toggle}:LayoutHeaderProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  // const [opened, setOpened] = useState(false);

  return (
    <Box className={styles.layoutHeader}>
      <Flex className={styles.layoutHeaderLeft}>
        <Image src={'/assets/logo-mobile.svg'} />
        <Text className={styles.headerLogoText}>kanban</Text>
        <Flex className={styles.headerTitleContainer} onClick={toggle}>
          <Text className={styles.headerText}>Platform Launch</Text>
          <Image className={styles.chevronDown} src={'/assets/icon-chevron-down.svg'} />
        </Flex>
      </Flex>

      <Flex className={styles.layoutHeaderRight}>
        <Button
          onClick={open}
          className={styles.headerButton}
          color='#635FC7'
        >
          <Text className={styles.headerButtonText}>+</Text>
          <Text className={styles.headerButtonTextDesktop}>+ Add New Task</Text>
        </Button>

        <Modal 
          classNames={{body: styles.modalController}} 
          opened={opened} 
          onClose={close} 
          centered 
          withCloseButton={false}
        >
          <Suspense>
            <ModalAddTask close={close} />
          </Suspense>
        </Modal>

        {/* <Image className={styles.headerElipses} src={'/assets/icon-vertical-ellipsis.svg'} /> */}
      </Flex>
    </Box>
  );
}

export default LayoutHeader;
