import { FC } from "react";
import img from "../assets/404.png"; 
import { Link } from "react-router-dom";

const ErrorPage: FC = () => {

  return (
    <div className="min-h-screen items-center bg-slate-900 text-white flex justify-center flex-col gap-10">
      <img src={img} alt="404" className="w-80" />
      <Link
        to="/"
        className="bg-sky-500 rounded-md px-6 py-2 hover:bg-red inline-flex items-center" 
      >
        Go back to home
      </Link>
    </div>
  );
};

export default ErrorPage;