import "./Spinner.css";
import loadingSrc from "../../../Assets/Images/loading1.gif";

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
			<img src={loadingSrc} />
        </div>
    );
}

export default Spinner;
