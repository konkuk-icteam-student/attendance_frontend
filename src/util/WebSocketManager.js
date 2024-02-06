import SockJS from "sockjs-client";
import Stomp from "stompjs";

const WebSocketManager = (callback) => {
  const socket = new SockJS("http://localhost:8080/ws");
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log("Connected to WebSocket");
    callback(stompClient);
  });

  return () => {
    stompClient.disconnect();
    console.log("Disconnected from WebSocket");
  };
};

export default WebSocketManager;
