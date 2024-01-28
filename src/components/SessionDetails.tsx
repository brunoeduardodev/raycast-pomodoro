import { useEffect, useState } from "react";
import { Session } from "../models";
import { Detail, LocalStorage } from "@raycast/api";
import { localStorageKeys } from "../localStorageKeys";

const formatMissingTime = (missingTime: number) => {
  const seconds = Math.round(missingTime / 1000);
  const minutes = Math.floor(seconds / 60);

  if (minutes === 0) {
    return `00:${seconds.toString().padStart(2, "0")}`;
  }

  const missingSeconds = seconds - minutes * 60;

  return `${minutes.toString().padStart(2, "0")}:${missingSeconds.toString().padStart(2, "0")}`;
};

type Props = {
  activeSession: Session;
};

export const SessionDetails = ({ activeSession }: Props) => {
  const [missingTime, setMissingTime] = useState(activeSession.endsAt - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setMissingTime((prev) => prev - 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Detail markdown={`# ${formatMissingTime(missingTime)}`} />;
};
