import styles from "./page.module.css";
import BoardEmpty from "@/components/BoardEmpty/BoardEmpty";

export default function Home() {
  return (
    <main className={styles.main}>
      <BoardEmpty />
    </main>
  );
}