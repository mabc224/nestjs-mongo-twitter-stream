import SocketIOClient from "socket.io-client";
const socketUrl = process.env.REACT_APP_SOCKET_URL;

export const socket = SocketIOClient.connect(socketUrl);
