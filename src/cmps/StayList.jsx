import { StayPreview } from "./StayPreview";

export function StayList({ stays }) {

    return (
        <ul className="stay-list">
            {stays.map((stay) => (
                <li key={stay._id} >
                    <StayPreview stay={stay} />
                </li>
            ))}
        </ul>
    )
}