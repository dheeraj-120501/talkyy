import { useEffect, useState } from "react";
import { openDB, type IDBPDatabase } from "idb";

export const useIndexedDB = <T>(storeName: string, dbVersion: number) => {
  const [records, setRecords] = useState<T[]>([]);
  const dbName = "MyDatabase";
  const indexName = storeName + "TimestampIdx";

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB(dbName, dbVersion, {
        upgrade(db) {
          const store = db.createObjectStore(storeName, {
            keyPath: ["id", "userId", "language"],
          });
          store.createIndex(indexName, "timestamp");
        },
      });
      await loadRecords(db);
    };

    initDB();
  }, []);

  const loadRecords = async (db: IDBPDatabase) => {
    const allRecords = (
      await db.getAllFromIndex(storeName, indexName)
    ).reverse();
    setRecords(allRecords);
  };

  const addRecord = async (record: T) => {
    const db = await openDB(dbName, dbVersion);
    await db.add(storeName, record);
    await loadRecords(db); // Reload users after adding
  };

  const deleteRecord = async (id: string) => {
    const db = await openDB(dbName, dbVersion);
    await db.delete(storeName, id);
    await loadRecords(db);
  };

  const deleteAllRecords = async () => {
    const db = await openDB(dbName, dbVersion);
    await db.clear(storeName);
    await loadRecords(db);
  };

  return { records, addRecord, deleteRecord, deleteAllRecords };
};
