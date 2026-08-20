export default function HomepageContentMenu() {
  return (
    <div className="bg-gray-900 h-24 w-full flex items-center p-4 gap-4 text-white">
      {/* Container Foto */}
      <div className="bg-blue-400 w-16 h-16 rounded-lg flex items-center justify-center shrink-0">
        Foto
      </div>

      {/* Container Deskripsi */}
      <div className="bg-red-500 flex-1 h-16 p-2 rounded-lg flex items-center">
        Deskripsi Foto
      </div>
    </div>
  )
}