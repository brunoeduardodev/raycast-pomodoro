import { useEffect, useState } from "react";
import { Session } from "../models";
import { Cache, LocalStorage } from "@raycast/api";
import { localStorageKeys } from "../localStorageKeys";

export const useActiveSession = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSession, setActiveSession] = useState<Session | null>(null);

  useEffect(() => {
    async function loadActiveSession() {
      const session = await LocalStorage.getItem<string>(localStorageKeys.activeSession);
      if (!session) {
        setIsLoading(false);
        return;
      }

      try {
        const sessionData = JSON.parse(session) as Session;
        console.log({ sessionData });
        setActiveSession(sessionData);
      } catch (err) {
        //
      }
      setIsLoading(false);
      return;
    }

    loadActiveSession();
  }, []);

  useEffect(() => {
    if (!activeSession) {
      return;
    }

    const interval = setInterval(() => {
      if (new Date().getTime() > activeSession.endsAt) {
        console.log("clearing active session");
        setActiveSession(null);
        LocalStorage.removeItem(localStorageKeys.activeSession);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [activeSession]);

  return {
    isLoading,
    activeSession,
  };
};
