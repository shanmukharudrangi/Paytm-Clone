import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-2xl w-96 p-8">
                <div className="flex justify-center mb-4">
                    <div className="bg-indigo-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold">
                        P
                    </div>
                </div>
                <Heading label={"Welcome Back"} />
                <SubHeading label={"Sign in to your PayTM account"} />
                <InputBox onChange={e => setUsername(e.target.value)} placeholder="john@gmail.com" label={"Email"} />
                <InputBox onChange={e => setPassword(e.target.value)} placeholder="Enter your password" label={"Password"} />
                <div className="pt-4">
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username, password
                        })
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign In"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    )
}