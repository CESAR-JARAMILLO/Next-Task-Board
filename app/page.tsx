import Board from "@/components/Board/Board";
import styles from "./page.module.css";
import BoardEmpty from "@/components/BoardEmpty/BoardEmpty";

export default function Home({searchParams}: any) {
  const taskTypes = searchParams.taskTypes;

  return (
    <main className={styles.main}>
      {false ? (
        <BoardEmpty />
      ):(
        <>
        <Board taskTypes={taskTypes} />
        </>
      )}
    </main>
  );
}