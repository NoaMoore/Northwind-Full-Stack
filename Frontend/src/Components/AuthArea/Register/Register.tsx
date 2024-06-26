import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authService } from "../../../Services/AuthService";
import "./Register.css";
import { notify } from "../../../Utils/Notify";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();

    const navigate = useNavigate();
    
    async function send(user: UserModel) {
        try {
            await authService.register(user);
            const fullName = user.firstName + " " + user.lastName;
            notify.success("Welcome " + fullName);
            navigate("/home");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(send)}>

                <label>First name:</label>
                <input type="text" {...register("firstName")} />

                <label>Last name:</label>
                <input type="text" {...register("lastName")} />

                <label>Email:</label>
                <input type="email" {...register("email")} />

                <label>Password:</label>
                <input type="password" {...register("password")} />

                <button>Register</button>

            </form>

        </div>
    );
}

export default Register;
