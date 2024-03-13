import { Box, Button, CloseButton, Select, Text, TextInput, Textarea, Title } from '@mantine/core'
import styles from './ModalAddEdit.module.css'

const ModalAddEdit = () => {
  return (
    <Box className={styles.modalAddEdit}>
      <Title className={styles.modalAddEditTitle} order={2}>
        Research pricing points of various competitors and trial different business models
      </Title>

      <TextInput
        className={styles.addEditTitleInput}
        label="Title"
        placeholder="Add a description"
      />

      <Textarea
        className={styles.addEditDescriptionInput}
        label="Description"
        placeholder="e.g. It’s always good to take a break. This 
        15 minute break will  recharge the batteries 
        a little."
      />

      <Box>
        <Title className={styles.addEditCloseInputsTitle} order={4}>
          Subtasks
        </Title>
        <Box className={styles.viewSubtaskContainer}>
          <TextInput
            className={styles.addEditSubtaskInput}
            placeholder="e.g. Research competitor pricing and business models"
          />
          <CloseButton />
        </Box>
        <Box className={styles.viewSubtaskContainer}>
          <TextInput
            className={styles.addEditSubtaskInput}
            placeholder="e.g. Research competitor pricing and business models"
          />
          <CloseButton />
        </Box>
        <Button className={styles.addNewButton}>Add New Subtask</Button>
      </Box>

      <Select
        classNames={{ label: styles.viewTaskStatusSelectLabel }}
        label="Current Status"
        placeholder="Choose a status"
        data={['Todo', 'Doing', 'Done']}
      />

      <Button className={styles.submitButton}>Create Task</Button>
    </Box>
  )
}

export default ModalAddEdit