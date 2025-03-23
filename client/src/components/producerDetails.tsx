import { useContext, useEffect, useRef, useState } from "react";
import { producerContext } from "../cotext/producerContext";
import { producer } from "../types/producer";
import { useParams, useNavigate } from "react-router-dom";

export const ProducerDetails = () => {
    const { currentProducer, getProducer, updateProducer } = useContext(producerContext);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showInput, setShowInput] = useState(true);
    const [email, setEmail] = useState("");
    const { emailFromNewProducer } = useParams();
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducer = async () => {
            if (emailFromNewProducer && getProducer) {
                setLoading(true);
                await getProducer(emailFromNewProducer);
                setShowInput(false);
                setLoading(false);
            }
        };
        fetchProducer();
    }, []);

    const isValidEmail = () => {
        return inputRef.current?.validity.valid || false;
    };

    const getDetails = async () => {
        setLoading(true);
        if (getProducer && email) {
            try {
                await getProducer(email);
            } catch (err) {
                console.error(err);
            }
        }
        setLoading(false);
    };

    const update = (e: any) => {
        e.preventDefault();
        setShowForm(false);
        if (currentProducer && updateProducer) {
            const newProducer: producer = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                details: e.target.details.value,
                events: currentProducer.events || [],
            };
            updateProducer(currentProducer.email, newProducer);
        }
    };

    const handleNavigate = (path: string) => {
        navigate(`/${path}`);
    };

    return (
        <div className="producer-details">
          {loading && <p className="loading">Loading Producer...</p>}
          {!currentProducer && !showInput && <p className="not-found">Producer not found</p>}
          {showInput && (
            <div className="email-input-section">
              <input
                ref={inputRef}
                type="email"
                placeholder="Insert your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                onClick={() => {
                  getDetails();
                  setShowInput(false);
                }}
                disabled={!isValidEmail()}
              >
                Submit
              </button>
            </div>
          )}
          {currentProducer && (
            <div className="producer-card">
              <h2 className="producer-name">{currentProducer.name}</h2>
              <div className="producer-info">
                <p><strong>Email:</strong> {currentProducer.email}</p>
                <p><strong>Phone:</strong> {currentProducer.phone}</p>
                <p><strong>Details:</strong> {currentProducer.details}</p>
              </div>
      
              {/* כפתור Update Producer בצבע אפור */}
              <button className="update-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide Form" : "Update Producer"}
              </button>
      
              {showForm && (
                <form onSubmit={update} className="update-form">
                  <input type="text" id="name" defaultValue={currentProducer.name} placeholder="Name" />
                  <input type="email" id="email" defaultValue={currentProducer.email} placeholder="Email" />
                  <input type="text" id="phone" defaultValue={currentProducer.phone} placeholder="Phone" />
                  <textarea id="details" defaultValue={currentProducer.details} placeholder="Details" />
                  <button type="submit">Update</button>
                </form>
              )}
      
              {/* קו חלוקה דק */}
              <div className="section-divider"></div>
      
              {/* רשימת האירועים */}
              <div className="producer-events">
                <h3>Events</h3>
                {currentProducer.events && currentProducer.events.length > 0 ? (
                  <ul>
                    {currentProducer.events.map((ev) => (
                      <li key={ev.eventID}>
                        <button className="event-link" onClick={() => handleNavigate(`eventDetailsForProducer/${ev.eventID}`)}>
                          {ev.eventName}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No events available.</p>
                )}
              </div>
      
              {/* כפתור Add Event */}
              <button className="add-event-btn" onClick={() => handleNavigate("AddEvent")}>
                Add Event
              </button>
            </div>
          )}
        </div>
      );
      
};
