import { Box, Button, Flex, Image, Text } from '@mantine/core';
import styles from './LayoutHeader.module.css';

interface LayoutHeaderProps {
  opened: boolean;
  toggle: () => void;
}

const LayoutHeader = ({toggle}:LayoutHeaderProps) => {

  return (
    <Box className={styles.layoutHeader}>
      <Flex className={styles.layoutHeaderLeft}>
        <Image src={'/assets/logo-mobile.svg'} />
        <Flex className={styles.headerTitleContainer} onClick={toggle}>
          <Text>Platform Launch</Text>
          <Image src={'/assets/icon-chevron-down.svg'} />
        </Flex>
      </Flex>

      <Flex className={styles.layoutHeaderRight}>
        <Button
          className={styles.headerButton}
          color='#635FC7'
        >
          <Text className={styles.headerButtonText}>+</Text>
        </Button>
        <Image className={styles.headerElipses} src={'/assets/icon-vertical-ellipsis.svg'} />
      </Flex>
    </Box>
  );
}

export default LayoutHeader;
