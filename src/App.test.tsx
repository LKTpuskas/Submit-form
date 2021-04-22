import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// integration test
test("should render app and successfully submitting the form", () => {
  render(<App />);

  // Name input
  const nameInput = screen.getByRole("textbox", { name: "Name" });
  fireEvent.change(nameInput, { target: { value: "Tom" } });
  expect(nameInput).toHaveValue("Tom");

  // Email input (skipping role as not required)
  const emailInput = screen.getByRole("textbox", { name: "Email" });
  fireEvent.change(emailInput, { target: { value: "tompom@gmail.com" } });
  expect(emailInput).toHaveValue("tompom@gmail.com");

  // Password input
  const passwordInput = screen.getByRole("textbox", { name: "Password" });
  fireEvent.change(passwordInput, { target: { value: "1Passwordpassword" } });
  expect(passwordInput).toHaveValue("1Passwordpassword");

  // Submitting form
  userEvent.click(screen.getByRole("button", { name: "Submit" }));

  // Privacy
  const updatesCheckbox = screen.getByRole("checkbox", {
    name: "Receive updates about Tray.io product by email",
  });
  fireEvent.click(updatesCheckbox, { target: { value: true } });
  expect(updatesCheckbox).toBeChecked();

  const commsCheckbox = screen.getByRole("checkbox", {
    name: "Receive communication by email for other products",
  });
  fireEvent.click(commsCheckbox, { target: { value: true } });
  expect(commsCheckbox).toBeChecked();

  // Submitting privacy
  userEvent.click(screen.getByRole("button", { name: "Submit" }));

  // Done panel
  const doneHeading = screen.getByRole("heading", {
    name:
      "Please verify your email address, you should have received an email from us already",
  });
  expect(doneHeading).toBeDefined();
});

test("should display validation error when submitting incomplete form", () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: "Name" });
  fireEvent.change(nameInput, { target: { value: "Tom" } });

  const emailInput = screen.getByRole("textbox", { name: "Email" });
  fireEvent.change(emailInput, { target: { value: "tompomgmail.com" } });

  const passwordInput = screen.getByRole("textbox", { name: "Password" });
  fireEvent.change(passwordInput, { target: { value: "1Pas" } });

  userEvent.click(screen.getByRole("button", { name: "Submit" }));

  expect(screen.getByText("Email address is not valid")).toBeDefined();
  expect(
    screen.getByText(
      "Password needs at least 10 characters, one number and one uppercase + lowercase"
    )
  ).toBeDefined();
});
