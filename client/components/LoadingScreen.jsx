import Loader from 'react-loader-spinner'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-gray-50 dark:bg-[#333] flex justify-center items-center">
      <Loader type="Oval" color="#3B82F6" height={40} width={40} />
    </div>
  )
}
