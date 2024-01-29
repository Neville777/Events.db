import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ user, logout }) => {
  return (
    <header className="Headers">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="HomeRoute">
              <Image
                width="40"
                height="40"
                src="https://img.icons8.com/50/000000/home.png"
                alt="home"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/about" className="AboutRoute">
                About
              </Link>
              <Link to="/events" className="EventsRoute">
                Events
              </Link>
              <Link to="/tickets" className="TicketsRoute">
                Tickets
              </Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="DashboardRoute">
                    Dashboard
                  </Link>
                  <Link to="/admin" className="AdminRoute">
                    Admin
                  </Link>
                  <Link to="/chat" className="ChatRoute">
                    Chat
                  </Link>
                  <Button onClick={logout}>Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/signup" className="SignupRoute">
                    Signup
                  </Link>
                  <Link to="/login" className="LoginRoute">
                    Login
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
