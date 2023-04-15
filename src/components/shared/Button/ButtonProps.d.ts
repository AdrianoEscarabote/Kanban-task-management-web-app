type SizeButton = "large" | "small"

interface ButtonProps {
  label: string
  backgroundColor: string
  size: SizeButton
  textColor: string
  type?: string
  onClick?: () => void
}

export { ButtonProps }