import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Auth = ({ heading, buttonText }: { heading: string, buttonText: string }) => {
    const userNameRef = useRef<HTMLInputElement>();
    const passWordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function signup() {
        const userName = userNameRef.current?.value;
        const passWord = passWordRef.current?.value;
        console.log(userName);
        await axios.post(BACKEND_URL + "/api/v1/signup", {
            userName: userName,
            password: passWord
        })
        alert("You have signed up");
        navigate("/signin");
    }
    async function signin() {
        const userName = userNameRef.current?.value;
        const passWord = passWordRef.current?.value;

        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
            userName: userName,
            password: passWord
        })
        alert("You have signed in");
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard")
    }
    return (
        <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
            <div className="border rounded-xl bg-white min-w-48 p-8">
                <div className="flex justify-center font-bold text-purple-700 text-lg pb-4">
                    {heading}
                </div>
                <Input reference={userNameRef} placeHolder={"User Name"} />
                <Input reference={passWordRef} placeHolder={"Password"} />
                <div className="flex justify-center pt-4">
                    <Button variant="primary" text={buttonText} onClick={heading == "Signup" ? signup : signin} />
                </div>
            </div>
        </div>
    )
}