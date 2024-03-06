import { Title } from "@mantine/core";
import styles from "./page.module.css";
import 'server-only'

export default function Home() {
  return (
    <main className={styles.main}>
      <Title>Server Component</Title>
    </main>
  );
}