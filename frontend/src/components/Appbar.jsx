import { useEffect, useState } from "react"
import axios from "axios"

export const Appbar = () => {
    const [name, setName] = useState("")

    useEffect(() => {
        axios.get("https://paytmclone-backend.onrender.com/api/v1/user/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            setName(response.data.firstName)
        })
    }, [])

    return <div className="bg-white shadow-sm h-16 flex justify-between items-center px-8">
        <div className="text-indigo-600 font-bold text-xl">
            💸 PayTM
        </div>
        <div className="flex items-center gap-3">
            <div className="text-gray-600 font-medium">
                Hello, {name}
            </div>
            <div className="rounded-full h-10 w-10 bg-indigo-600 flex justify-center items-center text-white font-bold">
                {name[0]}
            </div>
        </div>
    </div>
}