import { useEffect, useState } from "react";
import "./Clock.css";

function Clock(): JSX.Element {

    const [time, setTime] = useState<string>("Clock...");

    // useEffect(()=>{}, [a, b, c]); // [] ==> Call the callback whenever a, b or c changes.
    useEffect(() => {

        // Create timer once when component loads:
        const timerId = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
            console.log(now.toLocaleTimeString());
        }, 1000);

        // Returning a function which will be invoked when the component unmount (destroyed):
        return () => {
            // Close the timer:
            clearInterval(timerId);
        };

    }, []); // [] ==> Call the callback only once.

    return (
        <div className="Clock">
            <span id="clockSpan">{time}</span>
        </div>
    );

}

export default Clock;
