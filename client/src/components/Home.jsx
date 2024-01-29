import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = ({ userRole, events }) => {
  return (
    <div className="home-container">
      <Container className="home-content">
        <h1 className="home-title">Discover, Experience, Enjoy!</h1>
        <p className="home-description">
          Your one-stop destination for unforgettable events and experiences.
        </p>
        <div className="home-buttons">
          <Link to="/events" className="explore-button">
            <Button variant="success">Explore Events</Button>
          </Link>
          <Link to="/login" className="book-button">
            <Button variant="success">Book Tickets</Button>
          </Link>
          {userRole === "admin" && (
            <Link to="/create-event" className="create-event-button">
              <Button variant="warning">Create Event</Button>
            </Link>
          )}
        </div>
        <div className="home-events">
          <h2 className="home-events-header">Upcoming Events</h2>
          {events && events.length > 0 ? (
            <div className="events-list">
              {events.map((event) => (
                <div key={event.id} className="event-card">
                  <h3>{event.eventName}</h3>
                  <p>{event.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No upcoming events.</p>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
