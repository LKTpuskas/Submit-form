import { Dispatch, SetStateAction, SyntheticEvent } from "react";

import { FormCheckbox } from "./FormCheckbox";
import { ValidationProps } from "../hooks/useValidationForm";
import { StyledSubmitButton, StyledForm } from "./Form";

export interface PrivacyProps {
  validationData: ValidationProps;
  setTabsIndex: Dispatch<SetStateAction<number>>;
}

export function PrivacyForm({ validationData, setTabsIndex }: PrivacyProps) {
  const [updates, setUpdates] = validationData[4];
  const [communications, setCommunications] = validationData[5];

  function handleSubmit(event: SyntheticEvent) {
    if (validationData[6]) {
      setTabsIndex(2);
    }
    event.preventDefault();
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormCheckbox
        label="Receive updates about Tray.io product by email"
        checked={updates}
        setValue={setUpdates}
      />
      <FormCheckbox
        label="Receive communication by email for other products"
        checked={communications}
        setValue={setCommunications}
      />
      <StyledSubmitButton type="submit" />
    </StyledForm>
  );
}
