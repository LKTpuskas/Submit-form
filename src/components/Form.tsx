import { useState, Dispatch, SetStateAction, SyntheticEvent } from "react";
import styled from "styled-components";

import { FormInput } from "./FormInput";
import { ValidationProps } from "../hooks/useValidationForm";

export interface FormProps {
  validationData: ValidationProps;
  setTabsIndex: Dispatch<SetStateAction<number>>;
}

const StyledSubmitButton = styled.input`
  display: inline-block;
  border: 0.125rem solid rgb(13, 102, 229);
  background-color: rgb(13, 102, 229);
  border-radius: 2px;
  color: rgb(255, 255, 255);
  width: 84px;
  padding: 8px;
  margin-left: auto;
  outline: none;
`;

const StyledForm = styled.form`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

export function Form({ validationData, setTabsIndex }: FormProps) {
  const [name, setName] = validationData[0];
  const [email, setEmail] = validationData[1];
  const [password, setPassword] = validationData[2];
  const [role, setRole] = validationData[3];
  const [displayErr, setDisplayErr] = useState(false);
  const { isValid, errors } = validationData[6];

  const requiredFieldsHaveValue = !!(
    name.length &&
    email.length &&
    password.length
  );

  function handleSubmit(event: SyntheticEvent) {
    if (isValid) {
      setDisplayErr(false);
      setTabsIndex(1);
    }
    setDisplayErr(true);
    event.preventDefault();
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormInput label="Name" value={name} setValue={setName} />
      <FormInput
        label="Role"
        value={role}
        setValue={setRole}
        isRequired={false}
      />
      <FormInput label="Email" value={email} setValue={setEmail} />
      <FormInput label="Password" value={password} setValue={setPassword} />
      <StyledSubmitButton type="submit" />
      {displayValidationErrors(errors, displayErr, requiredFieldsHaveValue)}
    </StyledForm>
  );
}

function displayValidationErrors(
  errors: Set<string>,
  displayErr: boolean,
  requiredFieldsHaveValue: boolean
) {
  const err = [...errors];
  return (
    <>
      {displayErr && !requiredFieldsHaveValue && (
        <div>Please fill in missing required fields</div>
      )}
      {displayErr &&
        err.length > 0 &&
        err.map((error, key) => <p key={key}>{error}</p>)}
    </>
  );
}

export { StyledSubmitButton, StyledForm };
