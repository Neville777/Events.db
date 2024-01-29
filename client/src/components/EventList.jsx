import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EventList = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(" http://127.0.0.1:5000/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <h2>Upcoming Events</h2>
      <p>Buy tickets in advance for popular events</p>

      {isModalOpen && selectedEvent && (
        <Modal show={isModalOpen} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedEvent.description}</p>
            <p>Date: {formatDate(selectedEvent.date)}</p>
            <p>Location: {selectedEvent.location}</p>
            <img
              className="Event_img"
              src={selectedEvent.image_url}
              alt={selectedEvent.title}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {!isModalOpen &&
        events.map((event) => (
          <Card
            key={event.id}
            className="EventCard"
            onClick={() => handleEventClick(event)}
          >
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Img
                className="image"
                src={event.image_url}
                alt={event.title}
              />
            </Card.Body>
          </Card>
        ))}

      {user && <Link to="/user-dashboard">Go to User Dashboard</Link>}
    </div>
  );
};

export default EventList;
