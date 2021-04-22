import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

import { ValidationProps } from "../hooks/useValidationForm";

export interface DoneProps {
  validationData: ValidationProps;
}

const Styledcontainer = styled.section`
  background-color: #f7f7f7;
  width: 100%;
  height: 100%;
  padding: 8px;
  border-radius: 4px;
  margin-top: 16px;
`;

export function Done({ validationData }: DoneProps) {
  const submitResponse = validationData[7]();
  if (submitResponse) {
    return (
      <Styledcontainer>
        <>
          <FaCheck
            style={{
              display: "flex",
              margin: "16px auto",
              color: "green",
              fontSize: "40px",
            }}
          />
          <h1>
            Please verify your email address, you should have received an email
            from us already
          </h1>
        </>
        <>
          <h3>Form</h3>
          <p>Name: {submitResponse?.form?.name}</p>
          <p>Role: {submitResponse?.form?.role}</p>
          <p>Email: {submitResponse?.form?.email}</p>
          <p>Password: {submitResponse?.form?.password}</p>
        </>
        <>
          <h3>Privacy</h3>
          <p>
            Receive updates about Tray.io product by email:
            {submitResponse?.privacy?.updates ? (
              <FaCheck style={{ color: "green" }} />
            ) : null}
          </p>
          <p>
            Receive communication by email for other products:
            {submitResponse?.privacy?.communication ? (
              <FaCheck style={{ color: "green" }} />
            ) : null}
          </p>
        </>
      </Styledcontainer>
    );
  }
  return null;
}
