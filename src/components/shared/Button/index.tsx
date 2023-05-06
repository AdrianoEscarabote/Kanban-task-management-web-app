import React from "react"
import { ButtonProps } from "./ButtonProps"

const Button: React.FC<ButtonProps> = ({ label, backgroundColor, size, textColor, onClick, hover, type, ariaLabel }) => {
    
  return (
    <button
      type={type ? type : "button"}
      className={`${hover} text-base/8 font-bold w-full rounded-3xl ${size === "large" ? "h-12" : "h-10"}`}
      style={{backgroundColor: `${backgroundColor}`, color: `${textColor}`}}
      onClick={onClick}
      aria-label={`${ariaLabel ? ariaLabel : null }`}
    >
      {label}
    </button>
  )
}

export default Button