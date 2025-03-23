import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { producerContext } from "../context/producerContext";


export const ProducerMenu = () => {
    const location = useLocation();
    const {setCurrentProducer}=useContext(producerContext);

    if (location.pathname === "/producerMenu") {
        if(setCurrentProducer)
            setCurrentProducer(null);
    }

    if (location.pathname !== "/producerMenu") {
        return null;
    }

    return <div>
        <div className="producer-menu">
            <NavLink to="/addProducer" className="producer-button">Sign Up</NavLink>
            <NavLink to="/producerDetails" className="producer-button">Sign In</NavLink>
        </div>
    </div>
}


