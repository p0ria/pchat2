import React, {createContext, useState} from 'react'

export interface IThemeContext {
  colors: {
    primary: string,
    primaryDark: string,
    secondary: string,
    secondaryLight: string,
    secondaryDark: string,
    tertiary: string,
    text: string,
    textLight: string,
    header: string,
    sub: string,
    light: string,
    orange: string,
    success: string,
    danger: string,
    warn: string
  }
}

const initialThemeContext = {
  colors: {
    primary: '#9C89B8',
    primaryDark: "#724cac",
    secondary: "#EFC3E6",
    secondaryLight: "#F0E6EF",
    secondaryDark: "#F0A6CA",
    tertiary: "#B8BEDD",
    text: "#222",
    textLight: "#f0f0f0",
    header: "#222",
    sub: "#555",
    light: "#f0f0f0",
    orange: "#ff6600",
    success: "#34d434",
    danger: "#e42f2f",
    warn: "#fdfa37"
  }
}

export const ThemeContext = createContext<[IThemeContext, (theme: IThemeContext) => void]>(
  [initialThemeContext, f => {}]
);

export default function ThemeContextProvider(props: any) {
  const [theme, setTheme] = useState(initialThemeContext)
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </ThemeContext.Provider>
  )
}