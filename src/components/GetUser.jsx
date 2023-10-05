"use client";

import { getUser } from "src/services/api/usersApi";
import { useApi } from "src/services/hooks/useApi";
import * as styles from "src/styles/components.module.css";

const ApiHandler = () => {
  const {
    data,
    apiHandler: fetchUser,
    isLoading,
    isInactive,
    isError,
    error,
    isSuccess,
  } = useApi(() => getUser("1"));

  return (
    <div>
      <h2 className={styles.heading}>Get User</h2>
      <p className={styles.aboutText}>
        API handler returns pending, error, loading and success states. Only one
        of these can be active.
      </p>
      {isInactive && (
        <button className={styles.button} onClick={fetchUser}>
          Fetch User Details Button
        </button>
      )}
      {isLoading && <p className={styles.outlined}>Loading...</p>}
      {isError && <p className={styles.outlined}>Error: {error.message}</p>}
      {isSuccess && (
        <p className={styles.outlined}>
          Succesfully returned the username: {data.username}
        </p>
      )}
    </div>
  );
};

export default ApiHandler;
