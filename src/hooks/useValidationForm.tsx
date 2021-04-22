import { useState, Dispatch, SetStateAction } from "react";

import { SubmitResponse } from "../App";

export interface FormCriteria {
  name: string;
  email: string;
  password: string;
}

export interface SelectedField {
  value: string;
  validationMessage: string;
}

export type ValidationProps = [
  [string, Dispatch<SetStateAction<string>>],
  [string, Dispatch<SetStateAction<string>>],
  [string, Dispatch<SetStateAction<string>>],
  [string, Dispatch<SetStateAction<string>>],
  [boolean, Dispatch<SetStateAction<boolean>>],
  [boolean, Dispatch<SetStateAction<boolean>>],
  Validate,
  () => SubmitResponse | undefined
];

export interface Validate {
  isValid: boolean;
  errors: Set<string>;
}

export type StringDispatchState = Dispatch<SetStateAction<SelectedField>>;
export type ValidationReturnType = [SelectedField, StringDispatchState];

function isNameValid(name: string) {
  return /^(?!\s*$).+/.test(name);
}

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPasswordValid(password: string) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{10,}$/.test(password);
}

function validateCriteria({ name, email, password }: FormCriteria) {
  const errors = new Set("");

  if (!isNameValid(name) && name !== "") {
    errors.add("Name is required");
  }
  if (!isEmailValid(email) && email !== "") {
    errors.add("Email address is not valid");
  }
  if (!isPasswordValid(password) && password !== "") {
    errors.add(
      "Password needs at least 10 characters, one number and one uppercase + lowercase"
    );
  }
  return {
    isValid:
      isNameValid(name) && isEmailValid(email) && isPasswordValid(password),
    errors,
  };
}

/* 
useValidationForm
- A hook to handle the form state
- Stores the input-field state
- Validates the input data and returns a submitResponse
*/

export function useValidationForm(): ValidationProps {
  const selectedName = useState<string>("");
  const selectedRole = useState<string>("");
  const selectedEmail = useState<string>("");
  const selectedPassword = useState<string>("");

  const selectedUpdates = useState<boolean>(false);
  const selectedCommunication = useState<boolean>(false);

  const validateObj = validateCriteria({
    name: selectedName[0],
    email: selectedEmail[0],
    password: selectedPassword[0],
  });

  function submitResponse(): SubmitResponse | undefined {
    if (validateObj.isValid) {
      return {
        form: {
          name: selectedName[0],
          email: selectedEmail[0],
          password: selectedPassword[0],
          role: selectedRole[0],
        },
        privacy: {
          updates: selectedUpdates[0],
          communication: selectedCommunication[0],
        },
      };
    }
    return undefined;
  }

  return [
    selectedName,
    selectedEmail,
    selectedPassword,
    selectedRole,
    selectedUpdates,
    selectedCommunication,
    validateObj,
    submitResponse,
  ];
}
