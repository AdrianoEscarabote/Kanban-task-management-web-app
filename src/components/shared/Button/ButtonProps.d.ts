type SizeButton = "large" | "small"

type typeButton = "button" | "submit" | "reset"

interface ButtonProps {
  label: string
  backgroundColor: string
  size: SizeButton
  textColor: string
  type?: typeButton
  hover?: string
  onClick?: () => void
}

export { ButtonProps }