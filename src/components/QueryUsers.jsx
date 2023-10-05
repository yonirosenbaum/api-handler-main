"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { listUsers, queryUser } from "src/services/api/usersApi";
import * as styles from "src/styles/components.module.css";

const SearchWithCancel = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const searchAbortRef = useRef(null);

  const fetchUsers = async () => {
    const userData = await listUsers();
    setData(userData);
  };

  const onQueryChange = async (e) => {
    const q = e.currentTarget.value;
    setQuery(q);
    try {
      searchAbortRef.current?.();
      const queryParams = q ? { name: q } : undefined;
      const response = await queryUser(queryParams, {
        abort: (abort) => {
          searchAbortRef.current = abort;
        },
      });
      setData(response);
    } catch (error) {
      if (error.aborted && process.env.NODE_ENV === "development") {
        console.warn("REQUEST ABORTED!");
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <h2 className={styles.heading}>Search with request cancellation</h2>
        <p className={styles.aboutText}>
          Requests will be aborted once a user continues typing.
        </p>
        <div className={styles.card}>
          <form>
            <div className={styles.formContainer}>
              <label hidden className={styles.inlineLabel} for="name">
                Query a user
              </label>
              <div class={styles.inputWrapper}>
                <input
                  className={styles.inputUnderlined}
                  type="text"
                  id="name"
                  value={query}
                  placeholder="Query a user"
                  onChange={onQueryChange}
                />
                <span class={styles.underline}></span>
              </div>
            </div>
          </form>
          <ul>
            {data.map((user) => {
              return (
                <li key={user.id} className={styles.dropdownItem}>
                  {user.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchWithCancel;
