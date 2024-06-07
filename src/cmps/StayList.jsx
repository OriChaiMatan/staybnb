import { StayPreview } from "./StayPreview";

export function StayList({ stays, onUpdateStay }) {

    return (
        <ul className="stay-list">
            {stays.map((stay) => (
                <li key={stay._id} >
                    <StayPreview stay={stay} onUpdateStay={onUpdateStay} />
                </li>
            ))}
        </ul>
    )
}