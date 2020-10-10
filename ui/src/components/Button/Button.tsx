import React, { useContext, useState } from 'react';
import "./Button.scss";
import { ThemeContext } from '../../contexts/ThemeContext';
import chroma from 'chroma-js';

export enum ButtonKind {
  Default, Primary, Secondary, Tertiary, Success, Danger, Warning
}

export interface IProps {
  kind?: ButtonKind
  [prop: string]: any
}

export default ({kind = ButtonKind.Default,...props}: IProps) => {
  const [theme] = useContext(ThemeContext);
  const [active, setActive] = useState(false);
  let color1, color2;
  switch(kind) {
    case ButtonKind.Primary: 
      color1 = theme.colors.primary;
      break;
    case ButtonKind.Secondary:
      color1 = theme.colors.secondary;
      break;
    case ButtonKind.Tertiary:
      color1 = theme.colors.tertiary;
      break;
    case ButtonKind.Success:
      color1 = theme.colors.success;
      break;
    case ButtonKind.Danger:
      color1 = theme.colors.danger;
      break;
    case ButtonKind.Warning:
      color1 = theme.colors.warn;
      break;
    default:
      color1 = theme.colors.light;
  }
  color2 = chroma(color1).darken().hex();
  const luminance = chroma(color1).luminance();
  const color = luminance > .5 ? theme.colors.text : theme.colors.textLight;
  const background = active ? color2 : `linear-gradient(${color1}, ${color2})`;
  const boxShadow = `0 2px 10px -2px ${color2}`; 
  const mouseDown = () => setActive(true);
  const mouseUp = () => setActive(false);

  return (
    <button className="Button" 
      style={{color, background, boxShadow}} 
      onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseUp}
      {...props}>
      {props.children}
    </button>
  )
}