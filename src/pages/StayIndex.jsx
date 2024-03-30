import { NavLink } from "react-router-dom";

export function StayIndex() {
    return (
        <nav>
            <NavLink to="/stay/:id">Go to StayDetails page</NavLink>
        </nav>
    )
}