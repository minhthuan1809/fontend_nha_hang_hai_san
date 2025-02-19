"use client"
import { Pagination as PaginationUI } from '@nextui-org/react'
import React from 'react'

export default function Pagination() {
  return (
    <div className='flex justify-center items-center my-12'>
      <PaginationUI total={10} initialPage={1} showShadow color="warning" />
    </div>
  )
}
