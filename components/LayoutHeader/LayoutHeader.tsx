import { Box, Burger, Button, Flex, Image, Text } from '@mantine/core';
import styles from './LayoutHeader.module.css';

interface LayoutHeaderProps {
  opened: boolean;
  toggle: () => void;
}

const LayoutHeader = ({opened, toggle}:LayoutHeaderProps) => {

  return (
    <Box className={styles.layoutHeader}>
      <Flex className={styles.layoutHeaderLeft}>
        <Image h={24} w={24} src={'/assets/logo-mobile.svg'} />
        <Flex className={styles.headerTitleContainer} onClick={toggle}>
          <Text>Platform Launch</Text>
          <Image h={6} w={12} src={'/assets/icon-chevron-down.svg'} />
        </Flex>
      </Flex>

      <Flex className={styles.layoutHeaderRight}>
        <Button bg={'#635FC7'} h={32} w={48} radius={24}>
          <Text style={{fontWeight: 'bold', fontSize: '18px'}}>+</Text>
        </Button>
        <Image className={styles.headerElipses} h={16} src={'/assets/icon-vertical-ellipsis.svg'} />
      </Flex>
    </Box>
  );
}

export default LayoutHeader;
