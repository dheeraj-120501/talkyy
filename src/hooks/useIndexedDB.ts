import { useEffect, useState } from "react";
import { openDB, type IDBPDatabase } from "idb";
import type { Language } from "../types/language";

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

  const addRecords = async (records: T[]) => {
    const db = await openDB(dbName, dbVersion);
    try {
      await Promise.all(records.map((record: T) => db.add(storeName, record)));
    } catch (e) {
      console.log(e);
    }
    await loadRecords(db); // Reload users after adding
  };

  const deleteRecord = async (
    id: string,
    usersId: string,
    language: Language,
  ) => {
    const db = await openDB(dbName, dbVersion);
    await db.delete(storeName, [id, usersId, language]);
    await loadRecords(db);
  };

  const deleteAllRecords = async () => {
    const db = await openDB(dbName, dbVersion);
    await db.clear(storeName);
    await loadRecords(db);
  };

  return { records, addRecord, addRecords, deleteRecord, deleteAllRecords };
};
