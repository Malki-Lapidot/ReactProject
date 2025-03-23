import { useContext, useState } from "react";
import { eventContext } from "../cotext/eventContext";
import { event } from "../types/event";
import { useNavigate } from "react-router-dom";
import { producerContext } from "../cotext/producerContext";
import { producer } from "../types/producer";

export const AddEvent = () => {

    const [showModal, setShowModal] = useState(true);
    const { addEvent } = useContext(eventContext);
    const navigate = useNavigate();
    const { updateProducer, currentProducer } = useContext(producerContext);

    const add = async (event: any) => {
        event.preventDefault();
        closeModal();
        const newEvent: event = {
            _id: "",
            name: event.target.name.value,
            date: event.target.date.value,
            location: event.target.location.value,
            targetAudience: event.target.targetAudience.value,
            details: event.target.details.value,
            image: ""
        }
        if (addEvent && updateProducer && currentProducer) {
            const updateEvent = await addEvent(newEvent);
            if (updateEvent) {
                const newProducer: producer = {
                    ...currentProducer,
                    events: [...(currentProducer.events || []), { eventID: updateEvent._id, eventName: updateEvent.name }]
                };
                await updateProducer(currentProducer.email, newProducer);
                navigate(`/producerDetails/${currentProducer.email}`);
            }
        }

    }

    const closeModal = () => {
        setShowModal(false);
        if(currentProducer)
            navigate(`/producerDetails/${currentProducer.email}`) 
    };

    return <div> {showModal && (
        <div className="modal active" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Update Event</h3>
                <button className="close-btn" onClick={() => closeModal()}>✖</button>
                <form onSubmit={add}>
                    <input type="text" id="name" placeholder="name" />
                    <input type="text" id="date" placeholder="date" />
                    <input type="text" id="location" placeholder="location" />
                    <input type="text" id="targetAudience" placeholder="targetAudience" />
                    <textarea id="details" placeholder="details"></textarea>

                    <div className="modal-buttons">
                        <button type="submit" className="save-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )}
    </div>
}