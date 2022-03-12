import { createContext } from "react";
import socketio from "socket.io-client";

const SOCKET_URL = "http://localhost:3001/";

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext();
