import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TicketList = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/tickets");
        console.log("Response Status:", response.status);
        if (!response.ok) {
          throw new Error("Error fetching tickets");
        }

        const data = await response.json();
        setTickets(data);
        console.log("Tickets fetched successfully:", data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTickets();
  }, []);

  const handleBuyTicket = async (event) => {
    const availableTickets = event.tickets_available;

    if (availableTickets > 0) {
      try {
        // Make PATCH request to update tickets_available
        const response = await fetch(
          `http://127.0.0.1:5000/tickets/${event.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets_available: availableTickets - 1 }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error updating ticket: ${response.status}`);
        }

        // Update the UI only if the backend update was successful
        const updatedTickets = tickets.map((ticket) =>
          ticket.id === event.id
            ? { ...ticket, tickets_available: availableTickets - 1 }
            : ticket
        );
        setTickets(updatedTickets);

        // Alert after successful update
        alert("You have bought a ticket for this successfully");
      } catch (error) {
        console.error("Error updating ticket:", error.message);
      }
    } else {
      alert("Tickets are sold out for this event!");
    }
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const formatDate = (dateString) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="Tickets">
      <h2>Available Tickets</h2>
      {selectedTicket ? (
        <Card>
          <Card.Img
            variant="top"
            src={selectedTicket.image_url}
            alt={selectedTicket.name}
          />
          <Card.Body>
            <Card.Title>{selectedTicket.name}</Card.Title>
            <Card.Text>
              Tickets Available: {selectedTicket.tickets_available}
              <br />
              Ticket Price: ${selectedTicket.ticket_price}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => handleBuyTicket(selectedTicket)}
            >
              Buy Ticket
            </Button>
            <Button variant="secondary" onClick={() => setSelectedTicket(null)}>
              Go Back
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <Card
                className="TicketCard"
                key={ticket.id}
                onClick={() => handleTicketClick(ticket)}
              >
                <Card.Img
                  variant="top"
                  src={ticket.image_url}
                  alt={ticket.name}
                />
                <Card.Body>
                  <Card.Title>{ticket.name}</Card.Title>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No tickets found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketList;
