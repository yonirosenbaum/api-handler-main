import * as styles from "src/styles/components.module.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.pageContainer}>{children}</div>
      </body>
    </html>
  );
}
