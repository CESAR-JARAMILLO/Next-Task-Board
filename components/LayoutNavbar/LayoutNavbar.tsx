import { Flex, Image, Switch, Text } from "@mantine/core";
import styles from './LayoutNavbar.module.css';
import { useState } from "react";
import cx from 'clsx';

const LayoutNavbar = ({}) => {
  const [selectedBoard, setSelectedBoard] = useState<string | null>('Platform Launch');
  const numberOfBoards = 3;
  const boardsList = ['Platform Launch', 'Marketing Plan', 'Roadmap']

  const handleBoardClick = (board: string) => {
    setSelectedBoard(board);
  };  
  
  return (
    <Flex className={styles.layoutNav}>
      <Flex className={styles.navbarTop}>
        <Text className={styles.navbarHeaderText}>All Boards ({numberOfBoards})</Text>
        {boardsList.map((board, index) => (
          <Flex
            className={cx(styles.navbarBoardsTabs, { [styles.selected]: board === selectedBoard })}
            key={board}
            onClick={() => handleBoardClick(board)}

          >
            <Image className={styles.icon} h={16} w={16} src={'/assets/icon-board.svg'} />
            <Text>{board}</Text>
          </Flex>
        ))}
        <Flex className={styles.navbarCreateBoard}>
          <Image h={16} w={16} src={'/assets/icon-board.svg'} />
          <Text className={styles.navbarCreateBoardText}>+ Create New Board</Text>
        </Flex>
      </Flex>

      <Flex className={styles.navbarBottom}>
        <Flex className={styles.navbarThemeToggle}>
          <Image h={16} w={16} src={'/assets/icon-light-theme.svg'} />
          <Switch defaultChecked />
          <Image h={16} w={16} src={'/assets/icon-dark-theme.svg'} />
        </Flex>
        <Flex className={styles.hideSidebar}>
          <Image h={16} w={16} src={'/assets/icon-hide-sidebar.svg'} />
          <Text className={styles.hideSidebarText}>Hide Sidebar</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LayoutNavbar;
