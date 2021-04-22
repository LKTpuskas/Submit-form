import React from "react";
import styled from "styled-components";
import { FaStarOfLife } from "react-icons/fa";

export interface FormProps {
  value: string;
  label: string;
  setValue: (value: string) => void;
  isRequired?: boolean;
}

const StyledLabelContainer = styled.label`
  margin: 8px 0;
`;

const StyledLabel = styled.label`
  font-size: 13.3333px;
  padding-right: 4px;
  text-align: left;
`;

const StyledInput = styled.input`
  margin-top: 8px;
  display: flex;
  width: 100%;
  border-radius: 4px;
  padding: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(66, 68, 73);
  outline-color: #0d66e5;
  font-weight: 400;
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Helvetica, sans-serif;
`;

export function FormInput({
  value,
  label,
  setValue,
  isRequired = true,
}: FormProps) {
  return (
    <StyledLabelContainer>
      <StyledLabel>{label}</StyledLabel>
      {isRequired && (
        <FaStarOfLife style={{ fontSize: "8px", color: "rgb(211, 63, 63)" }} />
      )}
      <StyledInput
        value={value}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
          setValue(target.value)
        }
      />
    </StyledLabelContainer>
  );
}
