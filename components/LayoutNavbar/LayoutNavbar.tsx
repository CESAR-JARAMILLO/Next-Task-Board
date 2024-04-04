import { Flex, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import LayoutNavbarThemeToggle from "../LayoutNavbarThemeToggle/LayoutNavbarThemeToggle";
import styles from './LayoutNavbar.module.css';
import cx from 'clsx';
import { createClient } from "@/utils/supabase/client";

const LayoutNavbar = ({}) => {
  const [selectedBoard, setSelectedBoard] = useState<string | null>('Platform Launch');
  const numberOfBoards = 3;
  const [boardsData, setBoardsData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchBoards = async () => {
      const { data, error } = await supabase.from('boards').select('*');
      if (error) {
        setError(error);
      } else {
        setBoardsData(data);
      }
    };

    fetchBoards();
  }, []);
  
  const handleBoardClick = (board: string) => {
    setSelectedBoard(board);
  };  
  
  return (
    <Flex className={styles.layoutNav}>
      <Flex className={styles.navbarTop}>
        <Text className={styles.navbarHeaderText}>All Boards ({boardsData.length})</Text>
        {boardsData.map((board, index) => (
          <Flex
            className={cx(styles.navbarBoardsTabs, { [styles.selected]: board === selectedBoard })}
            key={board.id}
            onClick={() => handleBoardClick(board)}

          >
            <Image className={styles.icon} src={'/assets/icon-board.svg'} />
            <Text>{board.name}</Text>
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
