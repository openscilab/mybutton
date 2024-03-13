import useStore from '../../Store/useStore';
import { useRef, useEffect } from 'react';
import { jwtDecode } from '../../Utils/String';

const useAccount = () => {
	const { selector } = useStore();
	const account = selector(s => s.account);

	//? Token
	const tokenRef = useRef<string | undefined>(account?.user?.token);
	useEffect(() => {
		tokenRef.current = account?.user?.token;
	}, [account?.user, account?.user?.token]);

	return { ...account, tokenRef };
};

export const isTokenValid = (token?: string) => {
	if (!token) token = window?.user_token || '';
	if (!token) return false;
	const exp = jwtDecode(token || '')?.exp;
	if (!exp) return false;
	return exp * 1000 > Date.now();
};

export default useAccount;
