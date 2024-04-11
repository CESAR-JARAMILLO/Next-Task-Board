'use client'

import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import styles from './ModalController.module.css'

interface ModalControllerProps {
  children: React.ReactNode;
  isOpened: boolean;
  onClose: () => void;
}

const ModalController = ({children, isOpened, onClose}:ModalControllerProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal bg={'black'} classNames={{ body: styles.modalBody }} opened={isOpened} withCloseButton={false} onClose={onClose} centered>
        {children}  
      </Modal>

      {/* <Button onClick={open}>Open modal</Button> */}
    </>
  )
}

export default ModalController