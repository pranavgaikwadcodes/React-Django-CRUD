export const InputBox = ({ placeholder, onChange, value }) => {
  return (
    <input
      type="text"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none mt-2"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}
