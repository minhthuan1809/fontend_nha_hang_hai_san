import React from 'react'
import Icon from '../../utils/Icon'
import Link from 'next/link'
import { removeAccentsAndSpaces } from '../../utils/removeAccentsAndSpaces'

export default function CartProduct({ filteredItems }: { filteredItems: any[] }) {
  if (!filteredItems?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-lg">
        <Icon 
          icon="ShoppingCart" 
          className="w-20 h-20 text-gray-300 mb-4 animate-bounce" 
        />
        <p className="text-gray-500 text-xl font-medium">Chưa có sản phẩm</p>
        <p className="text-gray-400 text-sm mt-2">Hãy thêm sản phẩm vào giỏ hàng</p>
      </div>
    )
  }

  return (
    <div><div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
    {filteredItems?.filter(item => !item.status).map((item: any, index: any) => (
      <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
        <div className="relative">
          {/* Phần chứa hình ảnh */}
          <div className="h-36 sm:h-48 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 `}
            />
          </div>

          {/* Nhãn món hot */}
          {item.hot && (
            <div className="absolute top-2 left-2">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Icon icon="Star" size={10} className="fill-white" />
                HOT
              </span>
            </div>
          )}

          {/* Lớp phủ khi hết hàng */}
          {!item.inStock && (
            <div className="absolute inset-0 bg-black/20  flex items-center justify-center">
              <div className="bg-red-500/60 text-white px-4 py-2 rounded-lg text-sm font-medium transform -rotate-12 shadow-xl border ">
                Tạm hết hàng
              </div>
            </div>
          )}

          {/* Nhãn giá */}
          <div className="absolute -bottom-3 right-3">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
              {item.price}
            </div>
          </div>
        </div>

        <div className="p-4 pt-5">
          {item.inStock ? (
            <Link href={`/products/${removeAccentsAndSpaces(item.name)}/${item.id}`} className="text-base font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
              {item.name}
            </Link>
          ) : (
            <span className="text-base font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2 cursor-not-allowed">
              {item.name}
            </span>
          )}

          <div className="flex items-center justify-between mt-3">
            {/* Đánh giá sao */}
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Icon icon="Star"
                    key={i}
                    size={12}
                    className={`${
                      i < Math.floor(item.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-600">
                ({item.rating})
              </span>
            </div>

            {/* Nút thêm vào giỏ hàng */}
            <button 
              disabled={!item.inStock}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                item.inStock 
                  ? "bg-amber-50 hover:bg-amber-100" 
                  : "bg-gray-100 cursor-not-allowed"
              }`}>
              <Icon icon="ShoppingCart" className={`w-4 h-4 ${item.inStock ? "text-amber-600" : "text-gray-400"}`} />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div></div>
  )
}
