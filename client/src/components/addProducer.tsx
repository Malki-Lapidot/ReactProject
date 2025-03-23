import { useContext, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { producerContext } from "../cotext/producerContext";
import { producer } from "../types/producer";

export const AddProducer = () => {
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();
    const {addProducer}=useContext(producerContext);

    const add=async(event:any)=>{
        event.preventDefault();
        closeModal();
        const newProducer:producer={
            name:event.target.name.value,
            email:event.target.email.value,
            phone:event.target.phone.value,
            details:event.target.details.value,
            events:[]
        }
        if(addProducer){
            await addProducer(newProducer);
            navigate(`/producerDetails/${newProducer.email}`);
        }
    }
    

    const closeModal = () => {
            setShowModal(false);
            navigate("/producerMenu");
        
    };

    return <>
        {showModal && (
            <div className="modal active" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h3>Add Producer</h3>
                    <button className="close-btn" onClick={closeModal}>✖</button>
                    <form onSubmit={add}>
                        <input type="text" id="name" placeholder={"name"} required/>
                        <input type="email" id="email" placeholder={"email"} required/>
                        <input type="text" id="phone" placeholder={"phone"} required/>
                        <textarea id="details" placeholder={"details"} required></textarea>

                        <div className="modal-buttons">
                            <button type="submit" className="save-btn">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </>
}