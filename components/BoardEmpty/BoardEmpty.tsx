import { Box, Button, Flex, Text } from '@mantine/core'
import styles from './BoardEmpty.module.css'
import ModalViewTask from '../ModalViewTask/ModalViewTask'
import ModalController from '../ModalController/ModalController'
import ModalAddEdit from '../ModalEditTask/ModalEditTask'

const BoardEmpty = () => {
  return (
      <ModalController>
        <ModalAddEdit />
      </ModalController>
    // <Flex className={styles.boardEmptyMain}>
    //   <Box className={styles.boardEmptyCenter}>
    //     <Text className={styles.boardEmptyText}>This board is empty. Create a new column to get started.</Text>
    //     <Button className={styles.boardEmptyButton} bg={'var(--primary-color)'}>+ Add New Column</Button>
    //   </Box>
    // </Flex>
  )
}

export default BoardEmpty