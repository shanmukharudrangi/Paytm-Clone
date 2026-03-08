import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-2xl w-96 p-8">
                <div className="flex justify-center mb-4">
                    <div className="bg-indigo-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold">
                        P
                    </div>
                </div>
                <Heading label={"Create Account"} />
                <SubHeading label={"Join PayTM and start sending money"} />
                <InputBox onChange={e => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
                <InputBox onChange={e => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
                <InputBox onChange={e => setUsername(e.target.value)} placeholder="john@gmail.com" label={"Email"} />
                <InputBox onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" label={"Password"} />
                <div className="pt-4">
                    <Button onClick={async () => {
                        const response = await axios.post("https://paytmclone-backend.onrender.com/api/v1/user/signup", {
                            username, firstName, lastName, password
                        });
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }} label={"Create Account"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    )
}