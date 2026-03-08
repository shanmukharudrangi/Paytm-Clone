import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-2xl w-96 p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Send Money</h2>

                <div className="flex items-center space-x-4 mb-6 bg-gray-50 p-4 rounded-xl">
                    <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center shadow">
                        <span className="text-2xl text-white font-bold">{name[0].toUpperCase()}</span>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Sending to</p>
                        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600" htmlFor="amount">
                            Amount (in Rs)
                        </label>
                        <input
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            id="amount"
                            placeholder="Enter amount"
                        />
                    </div>
                    <button
                        onClick={async () => {
                            await axios.post("https://paytmclone-backend.onrender.com/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                            navigate("/dashboard")
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
                    >
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    )
}