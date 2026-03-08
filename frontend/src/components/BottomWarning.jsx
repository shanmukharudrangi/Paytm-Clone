import { Link } from "react-router-dom"
export function BottomWarning({label, buttonText, to}) {
    return <div className="py-2 text-sm flex justify-center text-gray-400">
        <div>{label}</div>
        <Link className="text-indigo-600 font-medium hover:underline pl-1 cursor-pointer" to={to}>
            {buttonText}
        </Link>
    </div>
}