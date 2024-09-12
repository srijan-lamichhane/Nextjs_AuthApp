import { render, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Dashboard from '../src/app/dashboard/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

describe('Dashboard Page', () => {
  it('should redirect unauthenticated users to login', async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });
    Cookies.get.mockReturnValue(null); // Simulate no token

    render(<Dashboard />);

    await waitFor(() => expect(push).toHaveBeenCalledWith('/login'));
  });
});
