import Board from "@/components/Board/Board";
import styles from "./page.module.css";
import BoardEmpty from "@/components/BoardEmpty/BoardEmpty";

export default async function Home({searchParams}: any) {
  const taskTypes = searchParams.taskTypes;
  const boardID = searchParams.boardID;
  const taskID = searchParams.taskID;

  return (
    <main id="main" className={styles.main}>
      {false ? (
        <BoardEmpty />
      ):(
        <>
        <Board boardID={boardID} taskTypes={taskTypes} taskID={taskID} />
        </>
      )}
    </main>
  );
}