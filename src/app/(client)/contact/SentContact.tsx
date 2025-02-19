'use client'
import React, { useState } from 'react'
import { Button } from '@nextui-org/react'
import { Input, Textarea } from '@nextui-org/react'
import Icon from '@/app/_shared/utils/Icon'

export default function SentContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        message: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };
  return (
    <div className="bg-white ">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h3 className='text-2xl font-bold text-amber-500'>Gửi gmail cho chúng tôi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="name"
            label="Họ và tên"
            placeholder="Nhập họ và tên của bạn"
            radius="sm"
            startContent={<Icon icon="User" className="text-amber-600" size={20}/>}
            value={formData.name}
            onChange={handleChange}
          />
          
          <Input
            type="email" 
            name="email"
            label="Email"
            placeholder="Nhập email của bạn"
            radius="sm"
            startContent={<Icon icon="Mail" className="text-amber-600" size={20}/>}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <Input
          type="text"
          name="title"
          label="Tiêu đề"
          placeholder="Nhập tiêu đề"
          radius="sm"
          startContent={<Icon icon="NotebookPen" className="text-amber-600" size={20}/>}
          value={formData.title}
          onChange={handleChange}
        />

        <Textarea
          name="message"
          label="Nội dung"
          placeholder="Nhập nội dung tin nhắn của bạn"
          radius="sm"
          minRows={4}
          value={formData.message}
          onChange={handleChange}
        />

        <Button 
          size="lg"
          className="w-full bg-amber-600 text-white transition-colors duration-300 font-medium"
          type="submit"
        >
          Gửi tin nhắn
        </Button>
      </form>
    </div>
  )
}