import { useEffect, useState } from "react";
import type { Recording } from "../types/recording";
import type { Language } from "../types/language";
import { openDB, type IDBPDatabase } from "idb";

export const useRecordings = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const dbName = "MyDatabase";
  const storeName = "recordings";

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          db.createObjectStore(storeName, { keyPath: "id" }); // Use string key
        },
      });
      await loadRecodings(db);
    };

    initDB();
  }, []);

  const loadRecodings = async (db: IDBPDatabase) => {
    const allRecordings = await db.getAll(storeName);
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
    await loadRecodings(db); // Reload users after adding
  };

  const deleteRecording = async (id: string) => {
    const db = await openDB(dbName);
    await db.delete(storeName, id);
    await loadRecodings(db);
  };

  const deleteAllRecordings = async () => {
    const db = await openDB(dbName);
    await db.clear(storeName);
    await loadRecodings(db);
  };

  return { recordings, addRecording, deleteRecording, deleteAllRecordings };
};
