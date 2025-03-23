import { useContext, useState } from "react"
import { eventContext } from "../cotext/eventContext"
import { X, Search } from "lucide-react"; // אייקונים יפים מ-lucide-react
import { EventDetailsForUser } from "./eventDetailsForUser";

export const EventListWithFilter = () => {
    const { events } = useContext(eventContext);
    const [searchTerm, setSearchTerm] = useState("");

    let filterEvents = events?.filter((e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) // בדיקה אם שם האירוע מכיל את הערך שהוזן
    );

    return (
        <div className="search-container">
        <div className="input-wrapper">
            <Search className="search-icon" size={20} />
            <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <button className="clear-btn" onClick={() => setSearchTerm("")}>
                    <X size={20} />
                </button>
            )}
        </div>
        {filterEvents && <EventDetailsForUser events={filterEvents} />}
    </div>
    );
}