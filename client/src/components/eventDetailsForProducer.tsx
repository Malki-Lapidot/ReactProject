import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { eventContext } from "../context/eventContext";
import { event } from "../types/event";
import "../index.css"
import { producerContext } from "../context/producerContext";
import { producer } from "../types/producer";

export const EventDetailsForProducer = () => {
    const { eventID } = useParams();
    const [currentEvent, setCurrentEvent] = useState<event | undefined>(undefined);
    const { getEventByID, updateEvent, deleteEvent } = useContext(eventContext);
    const [showModal, setShowModal] = useState(false);
    const { currentProducer,updateProducer } = useContext(producerContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            if (eventID && getEventByID) {
                const result = await getEventByID(eventID);
                setCurrentEvent(result);
            }
        };
        fetchEvent();
    }, [eventID, getEventByID, updateEvent]);

    const update = async (event: any) => {
        event.preventDefault();
        setShowModal(false);
        if (currentEvent && updateEvent && getEventByID) {
            const newEvent: event = {
                _id: currentEvent._id,
                name: event.target.name.value,
                date: event.target.date.value,
                location: event.target.location.value,
                targetAudience: event.target.targetAudience.value,
                details: event.target.details.value,
                image: currentEvent.image
            }
            const result = await updateEvent(currentEvent._id, newEvent);
            if (result)
                setCurrentEvent(result)
        }
    }

    const deleteE = async () => {
        if (deleteEvent && currentEvent) {
            await deleteEvent(currentEvent._id);
            if (currentProducer && updateProducer && currentEvent) {
                const newProducer: producer = {
                    ...currentProducer,
                    events: (currentProducer.events || []).filter(event => event.eventID !== currentEvent._id)
                };
                await updateProducer(currentProducer.email, newProducer);
                navigate(`/producerDetails/${currentProducer.email}`);
            }
        }
    }

    const closeModal = (e: any) => {
        if (e.target.classList.contains("modal")) {
            setShowModal(false);
        }
    };

    return (
        <div className="event-container">
            {currentEvent && (
                <>
                    <h2>{currentEvent.name}</h2>
                    <p><strong>Date:</strong> {currentEvent.date}</p>
                    <p><strong>Location:</strong> {currentEvent.location}</p>
                    <p><strong>TargetAudience:</strong> {currentEvent.targetAudience}</p>
                    <p><strong>Details:</strong> {currentEvent.details}</p>
                    <img className="event-image" src={currentEvent.image} alt={currentEvent.name} />

                    <button className="update-btn" onClick={() => setShowModal(true)}>
                        Update
                    </button>
                    <button className="update-btn" onClick={() => deleteE()}>
                        Delete
                    </button>

                    {showModal && (
                        <div className="modal active" onClick={closeModal}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <h3>Update Event</h3>
                                <button className="close-btn" onClick={() => setShowModal(false)}>✖</button>
                                <form onSubmit={update}>
                                    <label htmlFor="">name:</label>
                                    <input type="text" id="name" defaultValue={currentEvent.name} />
                                    <label htmlFor="">date:</label>
                                    <input type="text" id="date" defaultValue={currentEvent.date} />
                                    <label htmlFor="">location:</label>
                                    <input type="text" id="location" defaultValue={currentEvent.location} />
                                    <label htmlFor="">targetAudience:</label>
                                    <input type="text" id="targetAudience" defaultValue={currentEvent.targetAudience} />
                                    <label htmlFor="">details:</label>
                                    <textarea id="details" defaultValue={currentEvent.details}></textarea>

                                    <div className="modal-buttons">
                                        <button type="submit" className="save-btn">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}