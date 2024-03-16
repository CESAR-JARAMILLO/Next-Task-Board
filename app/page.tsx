import Board from "@/components/Board/Board";
import styles from "./page.module.css";
import BoardEmpty from "@/components/BoardEmpty/BoardEmpty";

export default function Home({searchParams}: any) {
  const taskTypes = searchParams.taskTypes;

  return (
    <main id="main" className={styles.main}>
      {true ? (
        <BoardEmpty />
      ):(
        <>
        <Board taskTypes={taskTypes} />
        </>
      )}
    </main>
  );
}