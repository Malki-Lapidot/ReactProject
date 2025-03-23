import { useContext, useState } from "react";
import { eventContext } from "../context/eventContext";
import { event } from "../types/event";
import { useNavigate } from "react-router-dom";
import { producerContext } from "../context/producerContext";
import { producer } from "../types/producer";

export const AddEvent = () => {
    const [showModal, setShowModal] = useState(true);
    const { addEvent } = useContext(eventContext);
    const navigate = useNavigate();
    const { updateProducer, currentProducer } = useContext(producerContext);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (): Promise<string | null> => {
        if (!image) return null;

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            return data.imagePath || null;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const add = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        closeModal();

        const imagePath = await uploadImage();

        const newEvent: event = {
            _id: "",
            name: (event.target as any).name.value,
            date: (event.target as any).date.value,
            location: (event.target as any).location.value,
            targetAudience: (event.target as any).targetAudience.value,
            details: (event.target as any).details.value,
            image: imagePath || ""
        };

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
    };

    const closeModal = () => {
        setShowModal(false);
        if (currentProducer)
            navigate(`/producerDetails/${currentProducer.email}`);
    };

    return (
        <div>
            {showModal && (
                <div className="modal active" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Add Event</h3>
                        <button className="close-btn" onClick={() => setShowModal(false)}>✖</button>
                        <form onSubmit={add}>
                            <input type="text" id="name" placeholder="Name" required />
                            <input type="date" id="date" placeholder="Date" required />
                            <input type="text" id="location" placeholder="Location" required />
                            <input type="text" id="targetAudience" placeholder="Target Audience" required />
                            <textarea id="details" placeholder="Details" required></textarea>
                            <input type="file" accept="image/*" onChange={handleImageChange} />

                            {preview && <img src={preview} alt="Preview" width="150" />} {/* הצגת תצוגה מקדימה */}

                            <div className="modal-buttons">
                                <button type="submit" className="save-btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};