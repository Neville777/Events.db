import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="Footer">
      <Container>
        <Row>
          <Col>
            <div className="contact-info">
              <h4>Contact Us</h4>
              <p>Email: info@stellarevents.com</p>
              <p>Phone: (245) 456-7890</p>
            </div>
          </Col>
          <Col>
            <div className="copyright">
              <p>&copy; 2024 Stellar Events Company. All rights reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
