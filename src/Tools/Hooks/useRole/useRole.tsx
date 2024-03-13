import useAccount from '../useAccount';
import { ROLE_NAME } from '../../Store/reducers/AccountReducer';

const useRole = () => {
	const { user } = useAccount();
	const role: any = user?.role?.name;

	const hasRoles = (roles: ROLE_NAME[]) => {
		if (!role) return false;
		if (role === 'SUPER_ADMIN') return true;
		return roles.includes(role);
	};

	const isRole = (...roles: ROLE_NAME[]) => {
		if (!role || !roles || !roles?.length) return false;
		return roles?.includes(role);
	};

	return { hasRoles, isRole, user, role };
};

export default useRole;
