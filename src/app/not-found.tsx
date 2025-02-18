import React from 'react'
import Link from 'next/link'
export default function NotFound() {
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-amber-600">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mt-4">Trang không tồn tại</h2>
        <p className="text-gray-600 mt-4 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link 
          href="/"
          className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
        >
          Trở về trang chủ
        </Link>
      </div>
      
      <div className="mt-12 text-center text-gray-600">
        <p>Bạn có thể thử:</p>
        <ul className="mt-2">
          <li>- Kiểm tra lại đường dẫn URL</li>
          <li>- Trở về trang chủ và điều hướng lại</li>
          <li>- Liên hệ với chúng tôi nếu bạn cần hỗ trợ</li>
        </ul>
      </div>
    </div></>
  )
}
