type themeTypes = "light" | "dark";

interface initialStateProps {
  theme: string
}

interface ActionProps {
  type: string,
  payload: string
}

export { themeTypes, initialStateProps, ActionProps }