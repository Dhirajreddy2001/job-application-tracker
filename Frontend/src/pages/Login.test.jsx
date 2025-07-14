import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";



TextDecoderStream("fill login form and submit", async() => {

    render(<Login/>);
    const emailInput= screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button",{name : /login/i});


    await userEvent.type(emailInput,"testuser@example.com");
    await userEvent.type(passwordInput,"Test@1234");

    expect(emailInput).toHaveValue("testuser@example.com");
    expect(passwordInput).toHaveValue("Test@1234");
    expect(loginButton).toBeEnabled();

});