import Icon from '@/app/_shared/utils/Icon'
import { Input, Button } from '@nextui-org/react'
import React from 'react'

interface InputPasswordProps {
  password: string;
  setPassword: (password: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  placeholder?: string;
}

export default function InputPassword({ password, setPassword, isInvalid, errorMessage , placeholder }: InputPasswordProps) {
    const [isVisible, setIsVisible] = React.useState(false);
  return (
    <Input
    type={isVisible ? "text" : "password"}
    placeholder={placeholder} 
    size="lg"
    startContent={<Icon icon="Lock" className="text-2xl text-gray-400" />}
    endContent={
        <Button
        isIconOnly
        variant="light"
        onClick={() => setIsVisible(!isVisible)}
        >
            {!isVisible ? <Icon icon="Eye" className="text-2xl text-gray-400" /> : <Icon icon="EyeOff" className="text-2xl text-gray-400" />}
        </Button>
    }
    classNames={{
      input: "text-lg",
      inputWrapper: "shadow-sm"
    }}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    isInvalid={isInvalid}
    errorMessage={errorMessage}
  />
  )
}
