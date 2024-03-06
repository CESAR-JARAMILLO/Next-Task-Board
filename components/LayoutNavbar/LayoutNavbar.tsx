import { Flex, Image, Text } from "@mantine/core";
import { useState } from "react";
import LayoutNavbarThemeToggle from "../LayoutNavbarThemeToggle/LayoutNavbarThemeToggle";
import styles from './LayoutNavbar.module.css';
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
            <Image className={styles.icon} src={'/assets/icon-board.svg'} />
            <Text>{board}</Text>
          </Flex>
        ))}
        <Flex className={styles.navbarCreateBoard}>
          <Image src={'/assets/icon-board.svg'} />
          <Text className={styles.navbarCreateBoardText}>+ Create New Board</Text>
        </Flex>
      </Flex>

      <Flex className={styles.navbarBottom}>
        <LayoutNavbarThemeToggle />
        <Flex className={styles.hideSidebar}>
          <Image src={'/assets/icon-hide-sidebar.svg'} />
          <Text className={styles.hideSidebarText}>Hide Sidebar</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LayoutNavbar;
