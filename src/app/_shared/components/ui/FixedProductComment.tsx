import Icon from '@/app/_shared/utils/Icon'
import React from 'react'

export default function FixedProductComment() {
  return (
    <div className="fixed bottom-8 sm:bottom-1/2 left-5 sm:left-auto sm:-right-8 z-20 hover:-translate-x-1 transition-transform duration-300">
      <div className="rounded-full w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center gap-2 font-medium shadow-lg sm:w-32 sm:rounded-lg sm:-rotate-90 hover:shadow-xl cursor-pointer">
        <Icon icon="MessageCircle" className="w-5 h-5 sm:w-6 sm:h-6" />
        <p className="text-sm font-bold hidden sm:block">Hỗ Trợ</p>
      </div>
    </div>
  )
}
