type SizeButton = "large" | "small"

interface ButtonProps {
  label: string
  backgroundColor: string
  size: SizeButton
  textColor: string
  type?: string
  hover?: string
  onClick?: () => void
}

export { ButtonProps }