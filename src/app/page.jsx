import QueryUsers from "src/components/QueryUsers";
import GetUser from "src/components/GetUser";
import * as styles from "src/styles/components.module.css";
import "src/styles/globals.css";

export default function Home() {
  return (
    <main>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <GetUser />
        </div>
        <div className={styles.card}>
          <QueryUsers />
        </div>
      </div>
    </main>
  );
}
