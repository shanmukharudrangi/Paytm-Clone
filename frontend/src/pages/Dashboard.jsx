import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"
import axios from "axios"

export const Dashboard = () => {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            setBalance(response.data.balance)
        })
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            <div className="max-w-3xl mx-auto mt-10 px-4">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg mb-8">
                    <p className="text-sm opacity-80 mb-1">Total Balance</p>
                    <Balance value={balance.toFixed(2)} />
                </div>
                <div className="bg-white rounded-2xl shadow p-6">
                    <Users />
                </div>
            </div>
        </div>
    )
}