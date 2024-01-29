import EventAction from "./EventAction";
import EventForm from "./EventForm";

const AdminPanel = () => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <EventForm />
      <h3>Cancel an Event</h3>
      <EventAction />
    </div>
  );
};

export default AdminPanel;
