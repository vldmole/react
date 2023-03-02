import {getImageUrl} from "./util";
import {awardList} from "./AwardList";

export function Profile({person, size=100})
{
    return (
        <section className="profile">
            <h2>{person.name}</h2>
            <img
                className="avatar"
                src = {getImageUrl(person.imageId)}
                alt = {person.name}
                width = {size}
                height = {size}
            />
            <ul>
                <li>
                    <b>Profession: </b>
                    {person.profession}
                </li>
                <li>
                    <b>Awards: {person.awards.length} </b>
                    { awardList(person.awards) }
                </li>
                <li>
                    <b>Discovered: </b>
                    {person.discover}
                </li>
            </ul>
        </section>
    )
}
