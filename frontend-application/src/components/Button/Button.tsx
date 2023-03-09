import { StyledButton } from "./Button.styles";
import {SyntheticEvent} from "react";

interface IButtonProps {
  children: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: SyntheticEvent) => void;
  disabled?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  type,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton type={type ?? "button"} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
