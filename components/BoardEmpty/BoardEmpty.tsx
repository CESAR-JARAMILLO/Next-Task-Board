import { Box, Button, Flex, Text } from '@mantine/core'
import styles from './BoardEmpty.module.css'

const BoardEmpty = () => {
  return (
    <Flex className={styles.boardEmptyMain}>
      <Box className={styles.boardEmptyCenter}>
        <Text className={styles.boardEmptyText}>This board is empty. Create a new column to get started.</Text>
        <Button className={styles.boardEmptyButton} bg={'var(--primary-color)'}>+ Add New Column</Button>
      </Box>
    </Flex>
  )
}

export default BoardEmpty