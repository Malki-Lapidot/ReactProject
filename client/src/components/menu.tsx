import { NavLink, useLocation } from "react-router-dom"



export const Menu = () => {
    const location = useLocation();

    if (location.pathname !== "/") {
        return <NavLink to="/" className="nav-home">Home Page</NavLink>
    }
    return <div id="home">
        <div className="nav-container">
            <NavLink to="/eventListWithFilter" className="nav-button">User</NavLink>
            <NavLink to="/producerMenu" className="nav-button">Producer</NavLink>
        </div>
    </div>
}