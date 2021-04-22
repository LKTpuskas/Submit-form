import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export interface FormCheckboxProps {
  checked: boolean;
  label: string;
  setValue: Dispatch<SetStateAction<boolean>>;
}

const StyledLabelContainer = styled.label`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 12px 0;
`;

const StyledLabel = styled.div``;

const StyledCheckbox = styled.input`
  margin-bottom: 8px;
`;

export function FormCheckbox({ checked, label, setValue }: FormCheckboxProps) {
  return (
    <StyledLabelContainer>
      <StyledCheckbox
        type="checkbox"
        checked={checked}
        onChange={() => setValue(!checked)}
      />
      <StyledLabel>{label}</StyledLabel>
    </StyledLabelContainer>
  );
}
