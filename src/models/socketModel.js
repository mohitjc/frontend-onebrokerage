import environment from "../environment";
import io from "socket.io-client";

const socketModel = io(environment.api);
export default socketModel;
