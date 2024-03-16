import { Box, Button, CloseButton, Select, Text, TextInput, Textarea, Title } from '@mantine/core'
import styles from './ModalAddEdit.module.css'

const ModalAddEdit = () => {
  return (
    <Box className={styles.modalAddEdit}>
      <Title className={styles.modalAddEditTitle} order={2}>
        Research pricing points of various competitors and trial different business models
      </Title>

      <TextInput
        classNames={{ 
          input : styles.addEditTitleInput,
          label: styles.addEditTitleInputLabel
        }}
        label="Title"
        placeholder="Add a description"
      />

      <Textarea
        classNames={{
          input: styles.addEditDescriptionInput,
          label: styles.addEditDescriptionLabel
        }}
        label="Description"
        placeholder="e.g. It’s always good to take a break. This 
        15 minute break will  recharge the batteries 
        a little."
      />

      <Box>
        <Title className={styles.addEditCloseInputsTitle} order={4}>
          Subtasks
        </Title>
        <Box className={styles.addEditCloseInputsContainer}>
          <TextInput
            classNames={{
              input: styles.addEditCloseInput
            }}
            placeholder="e.g. Research competitor pricing"
          />
          <CloseButton />
        </Box>
        <Button classNames={{root: styles.addNewButtonRoot}}>+ Add New Subtask</Button>
      </Box>

      <Select
        classNames={{ label: styles.addEditStatusSelectLabel }}
        label="Current Status"
        placeholder="Choose a status"
        data={['Todo', 'Doing', 'Done']}
      />

      <Button classNames={{ root: styles.submitButtonRoot }}>Create Task</Button>
    </Box>
  )
}

export default ModalAddEdit