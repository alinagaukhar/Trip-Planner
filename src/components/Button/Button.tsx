import { MouseEventHandler } from "react";
import "./Button.scss";

type ButtonProps = {
  id: string;
  onClick: MouseEventHandler;
  src: string;
  text: string;
};
const Button = (props: ButtonProps) => {
  return (
    <button id={props.id} className="btn" onClick={props.onClick}>
      <img src={props.src} alt="" />
      <span>{props.text}</span>
    </button>
  );
};

export default Button;
