import { createContext } from "react";
import socketio from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_MOVIES_ENDPOINT;

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext();
