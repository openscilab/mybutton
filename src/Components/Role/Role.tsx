import { If } from 'tsx-statements';
import useRole from '@tools/Hooks/useRole/useRole';
import { ROLE_NAME } from '@tools/Store/reducers/AccountReducer';

export type RoleProps = { roles?: ROLE_NAME[]; not?: ROLE_NAME[]; is?: ROLE_NAME[] };

const Role: FC<RoleProps> = ({ children, roles, not, is }) => {
	const { hasRoles, role } = useRole();
	if (!role) return null;

	let pass = roles?.length ? hasRoles(roles || []) : true;

	if (not?.length) pass = pass && !not?.includes(role);

	if (is?.length) pass = pass && is?.includes(role);

	return <If condition={pass}>{children}</If>;
};

export default Role;
