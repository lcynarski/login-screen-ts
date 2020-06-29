import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders login page', () => {
  const { getByRole, getByLabelText } = render(<App />);
  expect(getByRole('heading')).toHaveTextContent('Welcome to our solution');
  expect(getByLabelText('Email')).toBeInTheDOM();
  expect(getByLabelText('Password')).toBeInTheDOM();
});
