import {Profile} from "./Profile";

export function Gallery({scientists})
{
    console.log("Gallery ", scientists);
    return (
        <div>
            <h1>Notable Scientists</h1>
            <Profile person = {scientists[0]} size='100'/>
            <Profile person = {scientists[1]} size='70'/>
        </div>
    );
}
