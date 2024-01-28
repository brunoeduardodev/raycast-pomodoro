import { Detail } from "@raycast/api";
import { useActiveSession } from "./hooks/useActiveSession";
import { SessionDetails } from "./components/SessionDetails";

export default function CurrentPomodoroSession() {
  const { activeSession, isLoading } = useActiveSession();

  if (isLoading) {
    return <Detail markdown={`# Loading...`} isLoading></Detail>;
  }

  if (!activeSession) {
    return <Detail markdown={`# No active session`}></Detail>;
  }

  return <SessionDetails activeSession={activeSession} />;
}
