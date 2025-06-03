import { useEffect, useState } from "react";
import type { Recording } from "../types/recording";
import type { Language } from "../types/language";
import { openDB, type IDBPDatabase } from "idb";

export const useRecordings = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const dbName = "MyDatabase";
  const storeName = "recordings";
  const indexName = "recordingsTimestampIdx";

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          const store = db.createObjectStore(storeName, { keyPath: "id" }); // Use string key
          store.createIndex(indexName, "timestamp");
        },
      });
      await loadRecordings(db);
    };

    initDB();
  }, []);

  const loadRecordings = async (db: IDBPDatabase) => {
    const allRecordings = (
      await db.getAllFromIndex(storeName, indexName)
    ).reverse();
    setRecordings(allRecordings);
  };

  const addRecording = async (
    audio: Blob,
    transcription: string,
    language: Language,
  ) => {
    const db = await openDB(dbName);
    const recording: Recording = {
      blob: audio,
      timestamp: new Date(),
      id: crypto.randomUUID(),
      language,
      transcription,
    };
    await db.add(storeName, recording);
    await loadRecordings(db); // Reload users after adding
  };

  const deleteRecording = async (id: string) => {
    const db = await openDB(dbName);
    await db.delete(storeName, id);
    await loadRecordings(db);
  };

  const deleteAllRecordings = async () => {
    const db = await openDB(dbName);
    await db.clear(storeName);
    await loadRecordings(db);
  };

  return { recordings, addRecording, deleteRecording, deleteAllRecordings };
};
