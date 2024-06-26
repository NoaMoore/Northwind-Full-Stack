import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { appStore } from "../../../Redux/Store";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();

    const navigate = useNavigate();
    
    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            const firstName = appStore.getState().user.firstName;
            notify.success(`Welcome back ${firstName}!`); // Cool code by Yonatan Ribak
            navigate("/home");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>

                <label>Email:</label>
                <input type="text" {...register("email")} />

                <label>Password:</label>
                <input type="password" {...register("password")} />

                <button>Login</button>

            </form>

        </div>
    );
}

export default Login;
