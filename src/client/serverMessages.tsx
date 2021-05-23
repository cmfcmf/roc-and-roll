import React, { useCallback, useContext, useEffect, useRef } from "react";
import { RRPoint } from "../shared/state";

// TODO: reuse other as soon as you need a new message type, this is just to
//       make the linter happy as the type is otherwise a constant
type RRMessageType = "reaction" | "other";

export type RRMessage = RRMessageReaction | RRMessageOther;

interface RRMessageBase {
  type: RRMessageType;
}

export interface RRMessageReaction extends RRMessageBase {
  type: "reaction";
  code: string;
  point: RRPoint;
}

interface RRMessageOther extends RRMessageBase {
  type: "other";
}

type MessageSubscriber = (message: RRMessage) => void;

export const useServerMessages = () => {
  return useContext(ServerMessagesContext);
};

const ServerMessagesContext = React.createContext<{
  subscribe: (subscriber: MessageSubscriber) => void;
  unsubscribe: (subscriber: MessageSubscriber) => void;
  send: (message: RRMessage) => void;
  socket: SocketIOClient.Socket | null;
}>({
  subscribe: () => {},
  unsubscribe: () => {},
  send: (_) => {},
  socket: null,
});
ServerMessagesContext.displayName = "ServerMessagesContext";

export function ServerMessagesProvider({
  socket,
  children,
}: React.PropsWithChildren<{ socket: SocketIOClient.Socket }>) {
  const subscribers = useRef<Set<MessageSubscriber>>(new Set());

  const subscribe = useCallback((subscriber: MessageSubscriber) => {
    subscribers.current.add(subscriber);
  }, []);

  const unsubscribe = useCallback((subscriber: MessageSubscriber) => {
    subscribers.current.delete(subscriber);
  }, []);

  const send = (message: RRMessage) => {
    subscribers.current.forEach((subscriber) => subscriber(message));
    socket.emit("MESSAGE", message);
  };

  useEffect(() => {
    const onMessage = (message: RRMessage) => {
      subscribers.current.forEach((subscriber) => subscriber(message));
    };
    socket.on("MESSAGE", onMessage);
    return () => {
      socket.off("MESSAGE", onMessage);
    };
  }, [socket]);

  return (
    <ServerMessagesContext.Provider
      value={{ socket, subscribe, unsubscribe, send }}
    >
      {children}
    </ServerMessagesContext.Provider>
  );
}