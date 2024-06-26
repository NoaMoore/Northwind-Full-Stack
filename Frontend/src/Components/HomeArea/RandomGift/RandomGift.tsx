import "./RandomGift.css";
import src1 from "../../../Assets/Images/gift1.jpg";
import src2 from "../../../Assets/Images/gift2.jpg";
import src3 from "../../../Assets/Images/gift3.jpg";
import src4 from "../../../Assets/Images/gift4.jpg";
import src5 from "../../../Assets/Images/gift5.jpg";
import { useEffect, useState } from "react";

function RandomGift(): JSX.Element {

    const gifts = [
        { name: "Gift 1", src: src1 },
        { name: "Gift 2", src: src2 },
        { name: "Gift 3", src: src3 },
        { name: "Gift 4", src: src4 },
        { name: "Gift 5", src: src5 },
    ];

    const [gift, setGift] = useState(gifts[0]);

    useEffect(() => {

        const timerId = setInterval(() => {
            const index = Math.floor(Math.random() * gifts.length);
            const gift = gifts[index];
            setGift(gift);
        }, 3000);

        return () => clearInterval(timerId);

    }, []); // [] --> Once.

    return (
        <div className="RandomGift">
            <span>{gift.name}</span>
            <br />
            <img src={gift.src} />
        </div>
    );
}

export default RandomGift;
