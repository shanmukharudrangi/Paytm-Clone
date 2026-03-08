export function InputBox({label, placeholder, onChange}) {
    return <div>
        <div className="text-sm font-medium text-gray-600 text-left py-2">
            {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"/>
    </div>
}