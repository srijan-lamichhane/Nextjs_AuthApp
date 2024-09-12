import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../src/app/login/page';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Mock the necessary modules
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('js-cookie', () => ({
  set: jest.fn(),
}));

describe('Login', () => {
  it('authenticates and redirects to dashboard on successful login', async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    render(<Login />);

    // Simulate user input for valid credentials
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/log in/i));

    // Assert token is set in cookies
    await waitFor(() => expect(Cookies.set).toHaveBeenCalledWith('token', 'logged_in'));

    // Assert redirection to dashboard
    await waitFor(() => expect(push).toHaveBeenCalledWith('/dashboard'));
  });

  it('shows an error message for invalid login credentials', async () => {
    render(<Login />);

    // Simulate user input for invalid credentials
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'invalidUser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongPassword' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/log in/i));

    // Assert error message is displayed
    await waitFor(() => expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument());
  });
});
