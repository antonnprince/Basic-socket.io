import io from "socket.io-client";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5174", { transports: ["websocket"] });

    newSocket.on("connection", () => {
      console.log("Connected to Socket IO");
    });

    newSocket.on("new_user_login", (data) => {
      // console.log("From here: ", data.message);
      toast.info(data.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const runEvent = () => {
    if (socket) {
      socket.emit("new_user_login", { message: "user logged in" });
    }
  };

  const runLocalEvent = () => {
    toast.info("This is a local event");
  };

  return (
    <div>
      <button onClick={runEvent}>
        Real Time Event
      </button>

      <button onClick={runLocalEvent}>
        Local event
      </button>

      <ToastContainer />
    </div>
  );
}

export default App;
