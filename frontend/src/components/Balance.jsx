export const Balance = ({ value }) => {
    return <div className="flex items-center">
        <div className="font-semibold text-white text-lg opacity-80">
            Your balance
        </div>
        <div className="font-bold ml-4 text-2xl text-white">
            Rs {value}
        </div>
    </div>
}