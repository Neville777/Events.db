import { Container, Row, Col } from "react-bootstrap";
import Footer from "./Footer";

const About = () => {
  return (
    <Container fluid className="about-section-container">
      <div className="about-background-image-container"></div>
      <Container className="about-section-text-container">
        <Row>
          <Col>
            <div className="primary-subheading">
              <h1>Stellar Event Management</h1>
            </div>
            <div className="primary-heading">
              <h2>Experience Events Like Never Before!!!</h2>
            </div>
            <div className="primary-text">
              <p>
                Stellar Event Management is dedicated to streamlining the event
                booking process, providing users with a user-friendly interface
                and seamless booking experience. Our integrated ticket booking
                application addresses issues like fragmented user experience,
                limited accessibility, scalability, data security, outdated
                technology, lack of personalization, and comprehensive event
                listings, ultimately enhancing the ticket booking experience for
                users and improving operations for event organizers and service
                providers.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="primary-text">
              <div className="key-features-heading">
                <h1>Key features</h1>
              </div>
              <div className="key-features-item">
                <h3>Event Search and Discovery:</h3>
                <p>
                  Users can easily search for events based on their interests,
                  location, and date.
                </p>
              </div>
              <div className="key-features-item">
                <h3>Event Details:</h3>
                <p>
                  Event pages provide comprehensive information about the event,
                  including descriptions, host, and venue details, etc. Users
                  can buy tickets for events directly from the event pages.
                </p>
              </div>
              <div className="key-features-item">
                <h3>Event Creation and Management:</h3>
                <p>
                  Organizers can create and manage events, including adding
                  descriptions, setting schedules, and managing registrations.
                </p>
              </div>
              <div className="key-features-item">
                <h3>Interactive Event Listings:</h3>
                <p>
                  Event listings are no longer static lists; they come alive
                  with interactive elements like hover details, event previews,
                  and direct links to event pages.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
};

export default About;
