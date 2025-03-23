import { event } from "../types/event";

export const EventDetailsForUser = (props:{events:event[]}) => {
  const { events } = props;

  return (
    <div className="events-grid">
      {events && events.length > 0 ? (
        events.map((currentEvent) => (
          <div key={currentEvent._id} className="event-container">
            <h2>{currentEvent.name}</h2>
            <p><strong>Date:</strong> {currentEvent.date}</p>
            <p><strong>Location:</strong> {currentEvent.location}</p>
            <p><strong>Target Audience:</strong> {currentEvent.targetAudience}</p>
            <p><strong>Details:</strong> {currentEvent.details}</p>
            <img
              className="event-image"
              src={currentEvent.image}
              alt={currentEvent.name}
            />
          </div>
        ))
      ) : (
        <p>אין אירועים להצגה</p>
      )}
    </div>
  );
};