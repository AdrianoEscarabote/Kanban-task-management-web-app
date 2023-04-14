interface HeaderProps {
  open: boolean
}

interface themeReducer {
  theme: string
}

interface rootState {
  themeReducer: themeReducer
}

export { rootState, HeaderProps }