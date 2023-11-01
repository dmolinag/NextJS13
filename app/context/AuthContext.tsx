'use client';

import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';
import { getCookie } from 'cookies-next';

interface User {
	id: number;
	first_name: string;
	lastName: string;
	email: string;
	password: string;
	phone: string;
}

interface State {
	loading: boolean;
	error: string | null;
	data: User | null;
}

interface AuthState extends State {
	setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
	loading: true,
	error: null,
	data: null,
	setAuthState: () => {},
});

export default function AuthContext({
	children,
}: {
	children: React.ReactNode;
}) {
	const [authState, setAuthState] = useState<State>({
		loading: false,
		data: null,
		error: null,
	});

	const fetchUser = async () => {
		setAuthState({
			data: null,
			error: null,
			loading: true,
		});
		try {
			const jwt = getCookie('jwt');

			if (!jwt) {
				return setAuthState({
					data: null,
					error: null,
					loading: false,
				});
			}

			const response = await axios.get('http://localhost:3000/api/auth/me', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});

			axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

			return setAuthState({
				data: response.data,
				error: null,
				loading: false,
			});
		} catch (error: any) {
			return setAuthState({
				data: null,
				error: error.response.data.errorMessage,
				loading: false,
			});
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<AuthenticationContext.Provider
			value={{
				...authState,
				setAuthState,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
}
