import { MenuBarExtra } from "@raycast/api";
import { useEffect, useState } from "react";
import { Session } from "./models";

export default function PomodoroMenuBar() {
  return (
    <MenuBarExtra icon="🍎" tooltip="Your Pull Requests" title={new Date().toISOString()}>
      <MenuBarExtra.Item title="Seen" />
      <MenuBarExtra.Item
        title="Example Seen Pull Request"
        onAction={() => {
          console.log("seen pull request clicked");
        }}
      />
      <MenuBarExtra.Item title="Unseen" />
      <MenuBarExtra.Item
        title="Example Unseen Pull Request"
        onAction={() => {
          console.log("unseen pull request clicked");
        }}
      />
    </MenuBarExtra>
  );
}

type Props = {
  activeSession: Session;
};

const ActiveSessionMenuBar = ({ activeSession }: Props) => {
  console.log("ActiveSessionMenuBar");
  const [missingTime, setMissingTime] = useState(activeSession.endsAt - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setMissingTime((prev) => prev - 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <MenuBarExtra icon="🍎" tooltip="Your Pull Requests" title={"Salve"}>
      <MenuBarExtra.Item title="Seen" />
      <MenuBarExtra.Item
        title="Example Seen Pull Request"
        onAction={() => {
          console.log("seen pull request clicked");
        }}
      />
      <MenuBarExtra.Item title="Unseen" />
      <MenuBarExtra.Item
        title="Example Unseen Pull Request"
        onAction={() => {
          console.log("unseen pull request clicked");
        }}
      />
    </MenuBarExtra>
  );
};
