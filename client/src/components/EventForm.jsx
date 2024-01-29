import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EventForm = ({ user }) => {
  const initialFormData = {
    title: "",
    description: "",
    date: null,
    location: "",
    image_url: "",
    tickets_available: 0,
    ticket_price: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "date" ? new Date(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      image_url: formData.image_url,
      tickets_available: formData.tickets_available,
      ticket_price: formData.ticket_price,
    };

    try {
      const response = await fetch(" http://127.0.0.1:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        console.log("Event created successfully.");

        setFormData({ ...initialFormData });
      } else {
        console.error("Error creating event:", await response.json());
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      <h2>Create an Event</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date:</Form.Label>
          <DatePicker
            selected={formData.date}
            onChange={(selectedDate) =>
              handleChange({
                target: { name: "date", value: selectedDate },
              })
            }
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location:</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image URL:</Form.Label>
          <Form.Control
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tickets Available:</Form.Label>
          <Form.Control
            type="number"
            name="tickets_available"
            value={formData.tickets_available}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ticket Price:</Form.Label>
          <Form.Control
            type="number"
            name="ticket_price"
            value={formData.ticket_price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">Create Event</Button>
      </Form>
    </div>
  );
};

export default EventForm;
