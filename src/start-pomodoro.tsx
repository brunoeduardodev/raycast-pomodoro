import { Action, ActionPanel, Form, LocalStorage, useNavigation } from "@raycast/api";
import { SessionType } from "./models";
import { useActiveSession } from "./hooks/useActiveSession";
import { localStorageKeys } from "./localStorageKeys";

const SessionDurations: Record<SessionType, number> = {
  session: 1000 * 60 * 25,
  "short-rest": 1000 * 30,
  "long-rest": 1000 * 60 * 15,
};

export default function StartPomodoroSession() {
  const navigation = useNavigation();
  const { activeSession, isLoading } = useActiveSession();
  console.log({ activeSession, isLoading });
  if (isLoading) {
    return <Form isLoading />;
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm<{ sessionType: SessionType }>
            title="Start Session"
            onSubmit={({ sessionType }) => {
              LocalStorage.setItem(
                localStorageKeys.activeSession,
                JSON.stringify({
                  sessionType,
                  endsAt: SessionDurations[sessionType] + new Date().getTime(),
                }),
              ).then(() => {
                navigation.pop();
              });
            }}
          />
        </ActionPanel>
      }
    >
      {activeSession && <Form.Description text="There's already an active session." />}

      <Form.Dropdown id="sessionType" title="Session Type">
        <Form.Dropdown.Item title="Work (25 mins)" value="session" />
        <Form.Dropdown.Item title="Short Rest (5 mins)" value="short-rest" />
        <Form.Dropdown.Item title="Long Rest (15 mins)" value="long-rest" />
      </Form.Dropdown>
    </Form>
  );
}
