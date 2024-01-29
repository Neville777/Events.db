import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function EventActions() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(" http://127.0.0.1:5000/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleDelete = (eventId) => {
    // Optimistically update the UI
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);

    // Send DELETE request to the backend
    fetch(` http://127.0.0.1:5000/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error deleting event: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => console.log("Event deleted from backend:", data))
      .catch((error) => console.error("Error deleting event:", error));
  };

  return (
    <div>
      <h2 className="deleteTitle">Event Actions</h2>
      {events.map((event) => (
        <Card key={event.id} className="EventAction">
          <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            <Card.Img
              className="EventImage"
              src={event.image_url}
              alt={event.name}
            />
            <Button variant="danger" onClick={() => handleDelete(event.id)}>
              Cancel
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default EventActions;
