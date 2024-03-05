import { Box, Burger } from '@mantine/core';
import styles from './LayoutHeader.module.css';

interface LayoutHeaderProps {
  opened: boolean;
  toggle: () => void;
}

const LayoutHeader = ({opened, toggle}:LayoutHeaderProps) => {

  return (
    <Box className={styles.layoutHeader}>
      <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Logo</div>
    </Box>
  );
}

export default LayoutHeader;
