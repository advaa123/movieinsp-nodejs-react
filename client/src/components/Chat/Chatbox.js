import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import Box from "@mui/material/Box";
import Chatmessage from "./Chatmessage";
import BotMessage from "./BotMessage";
import { SocketContext } from "../../context/socket";
import Input from "@mui/material/Input";
import Commands from "./Commands";
import { useNavigate } from "react-router-dom";
import ChatTyping from "./ChatTyping";
import { chatBoxStyle, headerStyle, messagesStyle } from "./Styles";

const ariaLabel = { "aria-label": "description" };

const Chatbox = ({ clicked }) => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messageEl = useRef(null);
  const [userMessage, setUserMessage] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  const commandNavigation = (command) => {
    if (command === "top rated") {
      navigate("/top-rated");
    } else if (command === "currently playing") {
      navigate("/");
    } else if (command === "upcoming") {
      navigate("/upcoming");
    }
  };

  const getUserMessages = useCallback(() => {
    return messages
      .filter((message) => message.sender === "You")
      .map((message) => message.content);
  }, [messages]);

  useEffect(() => {
    if (messageEl) {
      const current = messageEl.current;
      current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
      return () => current.removeEventListener("DOMNodeInserted");
    }
  }, []);

  useEffect(() => {
    socket.on("server typing", (msg) => {
      if (msg === "typing") setIsTyping(true);
      else setIsTyping(false);
    });
    socket.on("server stopped");
    socket.on("server chat message", (msg) => {
      setMessages((prev) => [...prev, { sender: "Bot", content: msg }]);
    });
    socket.on("user chat message", (msg) => {
      if (msg !== "clear")
        setMessages((prev) => [...prev, { sender: "You", content: msg }]);
      else setMessages((prev) => []);
    });
    socket.on(
      "commands",
      (commands) => {
        setMessages((prev) => [
          ...prev,
          { sender: "commands", content: commands },
        ]);
      },
      []
    );

    return () => socket.disconnect();
  }, [socket]);

  const handleMessage = (e) => {
    e.preventDefault();
    socket.emit("user chat message", userInput);
    commandNavigation(userInput.trim());
    setUserMessage((prev) => getUserMessages().length);
    setUserInput("");
  };

  const handleCommandClick = (e, command) => {
    e.preventDefault();
    socket.emit("user chat message", command);
    commandNavigation(command);
  };

  const handleKeyDown = (e) => {
    const userMessages = getUserMessages();
    if (e.keyCode === 38) {
      setUserInput(userMessages[userMessage] || "");
      if (userMessage > 0) {
        setUserMessage((prev) => prev - 1);
      }
    } else if (e.keyCode === 40) {
      if (userMessage < userMessages.length) {
        if (userMessages[userMessage]) {
          setUserInput(userMessages[userMessage] || "");
          setUserMessage((prev) => prev + 1);
        }
      }
    }
  };

  return (
    <Box sx={chatBoxStyle} style={{ display: clicked ? "flex" : "none" }}>
      <Box sx={headerStyle}>Chat</Box>
      <Box sx={messagesStyle} ref={messageEl}>
        {messages.length > 0 &&
          messages.map((message, index) => {
            if (message.sender === "Bot") {
              return <BotMessage key={index} message={message.content} />;
            } else if (message.sender === "You") {
              return (
                <Chatmessage
                  key={index}
                  username={message.sender}
                  message={message.content}
                />
              );
            } else if (message.sender === "commands") {
              return (
                <Commands
                  key={index}
                  cmd={message.content}
                  handleCommandClick={handleCommandClick}
                />
              );
            }
            return null;
          })}
      </Box>
      {isTyping ? <ChatTyping /> : null}
      <Box className="user-input">
        <form onSubmit={handleMessage}>
          <Input
            placeholder="Send a message..."
            inputProps={ariaLabel}
            sx={{ p: "5px", width: "100%" }}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </form>
      </Box>
    </Box>
  );
};

export default Chatbox;
