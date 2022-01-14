import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

// beforeEach(() => {
//   render(<ContactForm />);
// });

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.queryByText(/contact form/i);
  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstNameEl = screen.getByLabelText(/first name/i);

  userEvent.type(firstNameEl, "Bere");

  await waitFor(() => {
    const errors = screen.queryAllByText(/must have at least 5 characters/i);
    expect(errors.length).toBe(1);
  });
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const firstNameEl = screen.getByPlaceholderText("Edd");
  const lastNameEl = screen.getByPlaceholderText("Burke");
  const emailEL = screen.getByPlaceholderText("bluebill1049@hotmail.com");

  const button = screen.getByRole("button");
  userEvent.click(button);
  const errors = screen.getAllByTestId("error");
  expect(errors.length).toBe(3);
  expect(errors).toHaveLength(3);
  expect(screen.queryAllByTestId("error")).toHaveLength(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstNameEl = screen.getByPlaceholderText("Edd");
  const lastNameEl = screen.getByPlaceholderText("Burke");
  const emailEL = screen.getByPlaceholderText("bluebill1049@hotmail.com");

  userEvent.type(firstNameEl, "Berenika");
  userEvent.type(lastNameEl, "Ahmetaj");

  const button = screen.getByRole("button");
  userEvent.click(button);

  const errors = screen.queryAllByText(/must be a valid email address/i);
  expect(errors.length).toBe(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailEL = screen.getByPlaceholderText("bluebill1049@hotmail.com");

  userEvent.type(emailEL, "nika");
  const errors = screen.queryAllByText(/must be a valid email address/i);
  expect(errors.length).toBe(1);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const lastNameEl = screen.queryByPlaceholderText("Burke");

  const button = screen.getByRole("button");
  userEvent.click(button);

  const error = screen.queryAllByText(/lastName is a required field/i);
  expect(error.length).toBe(1);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name*/i);
  const lastName = screen.getByLabelText(/last name*/i);
  const email = screen.getByLabelText(/email*/i);

  userEvent.type(firstName, "Berenika");
  userEvent.type(lastName, "Ahmetaj");
  userEvent.type(email, "ahmetajberenika@gmail.com");

  const button = screen.getByRole("button");
  userEvent.click(button);

  //   await waitFor(() => {
  const outputFirstName = screen.queryByText("Berenika");
  const outputLastName = screen.queryByText("Ahmetaj");
  const outputEmail = screen.queryByText("ahmetajberenika@gmail.com");
  const outputMessage = screen.queryByTestId("messageDisplay");

  expect(outputFirstName).toBeInTheDocument();
  expect(outputLastName).toBeInTheDocument();
  expect(outputEmail).toBeInTheDocument();
  expect(outputMessage).not.toBeInTheDocument();
  //   });
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name*/i);
  const lastName = screen.getByLabelText(/last name*/i);
  const email = screen.getByLabelText(/email*/i);
  const message = screen.getByLabelText(/message/i);

  userEvent.type(firstName, "Berenika");
  userEvent.type(lastName, "Ahmetaj");
  userEvent.type(email, "ahmetajberenika@gmail.com");
  userEvent.type(message, "This is a good message");

  const button = screen.getByRole("button");
  userEvent.click(button);

  //   await waitFor(() => {
  const outputFirstName = screen.queryByText("Berenika");
  const outputLastName = screen.queryByText("Ahmetaj");
  const outputEmail = screen.queryByText("ahmetajberenika@gmail.com");
  const outputMessage = screen.queryByText("This is a good message");

  expect(outputFirstName).toBeInTheDocument();
  expect(outputLastName).toBeInTheDocument();
  expect(outputEmail).toBeInTheDocument();
  expect(outputMessage).toBeInTheDocument();
  //   });
});
