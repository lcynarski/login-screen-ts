import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import LoginForm from '../loginForm';

const apiUrl = 'https://iqot98h9u0.execute-api.eu-west-1.amazonaws.com/default/';

const server = setupServer(
    rest.post(apiUrl, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
    }),
)

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

beforeAll(() => server.listen())
afterEach(() => {
    server.resetHandlers()
})
afterAll(() => server.close())

test('allows the user to login successfully',async () => {
    render(
        <LoginForm />
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
        target: {value: 'testemail@email.com'},
    })
    fireEvent.change(screen.getByLabelText(/Password/i), {
        target: {value: 'Testpassword1'},
    })

    fireEvent.click(screen.getByRole("submit"))

    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith("/home"));
})

test('handles server exceptions', async () => {
    server.use(
            rest.post(apiUrl, (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({message: 'Internal server error'}))
        }),
    )
    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/Email/i), {
        target: {value: 'testemail@email.com'},
    })
    fireEvent.change(screen.getByLabelText(/Password/i), {
        target: {value: 'Testpassword1'},
    })
    fireEvent.click(screen.getByRole("submit"))

    await waitFor(() => screen.getByText('Selected email or password does not exist'))
})