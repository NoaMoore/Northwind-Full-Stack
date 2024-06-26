import { useState } from "react";
import "./UserData.css";

function UserData(): JSX.Element {

    // const arr = useState<string>("");
    // const data = arr[0];
    // const setData = arr[1];

    // Using destructuring assignment:
    const [data, setData] = useState<string>("");
    
    function getData(): void {
        const userValue = "" + prompt("Enter your data: ");
        setData(userValue);
    }

    return (
        <div className="UserData">
			<button onClick={getData}>Get Data</button>
            <span>User data: {data}</span>
        </div>
    );
}

export default UserData;
