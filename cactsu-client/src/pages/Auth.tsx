import { FC, useState } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/user.slice";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { LuPhone } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";

const Auth: FC = () => {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.login({ phoneNumber, password });
            if (data) {
                setTokenToLocalStorage('token', data.token);
                dispatch(login(data));
                toast.success("You have successfully logged in");
                navigate("/");
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    }

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            const data = await AuthService.registration({ name, surname, username, phoneNumber, password });
            if (data) {
                toast.success("You have successfully registered");
                setIsLogin(!isLogin);
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    }

    return (
        <div className="mt-40 flex flex-col justify-center items-center text-black">
            <div className="main">
                <h1 className="text-center text-xl mb-10">
                    {isLogin ? "Login" : "Registration"}
                </h1>

                <form onSubmit={isLogin ? loginHandler : registrationHandler} className="flex flex-col mx-auto gap-5">
                    {!isLogin && (
                        <>
                            <div className="relative">
                                <input type="text" className="input pl-10 pr-2 w-full" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                <AiOutlineUser size={20} className="absolute top-1/2 -translate-y-1/2 left-2 " />
                            </div>
                            <div className="relative">
                                <input type="text" className="input pl-10 pr-2 w-full" placeholder="Surname" onChange={(e) => setSurname(e.target.value)} />
                                <AiOutlineUser size={20} className="absolute top-1/2 -translate-y-1/2 left-2 " />
                            </div>
                            <div className="relative">
                                <input type="text" className="input pl-10 pr-2 w-full" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                <AiOutlineUser size={20} className="absolute top-1/2 -translate-y-1/2 left-2 " />
                            </div>
                        </>
                    )}
                    <div className="relative">
                        <input type="text" className="input pl-10 pr-2 w-full" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
                        <LuPhone size={20} className="absolute top-1/2 -translate-y-1/2 left-2 " />
                    </div>
                    <div className="relative">
                        <input type="password" className="input pl-10 pr-2 w-full" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <RiLockPasswordLine size={20} className="absolute top-1/2 -translate-y-1/2 left-2 " />
                    </div>
                    {!isLogin && (
                        <div className="relative">
                            <input type="password" className="input pl-10 pr-2 w-full" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            <RiLockPasswordLine size={20} className="absolute top-1/2 -translate-y-1/2 left-2 " />
                        </div>
                    )}
                    <button className="btn btn-purple mx-auto">
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <div className="flex justify-center mt-5">
                    <button onClick={() => setIsLogin(!isLogin)} className="text-slate-400 hover:text-black">
                        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
