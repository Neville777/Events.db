import { useState, useEffect } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(" http://127.0.0.1:5000/reviews")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch messages: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMessages(data))
      .catch((error) => setError(error.message));
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      fetch(" http://127.0.0.1:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to send message: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setMessages([...messages, data]))
        .catch((error) => setError(error.message));

      setMessage("");
    }
  };

  return (
    <div>
      <Button onClick={() => setShowChat(!showChat)}>
        {showChat ? "Hide Review" : "Show Review"}
      </Button>
      {showChat && (
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <ListGroup>
            {messages.map((msg) => (
              <ListGroup.Item key={msg.id}>{msg.text}</ListGroup.Item>
            ))}
          </ListGroup>
          <Form>
            <Form.Group controlId="messageInput">
              <Form.Control
                type="text"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button onClick={sendMessage}>Send</Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Chat;
