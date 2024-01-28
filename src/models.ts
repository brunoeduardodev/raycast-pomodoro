export type SessionType = "session" | "short-rest" | "long-rest";

export type Session = {
  sessionType: SessionType;
  endsAt: number;
};
