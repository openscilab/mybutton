import { lazy } from 'react';
import { Path } from './RouteRenderer';
import { Navigate } from 'react-router-dom';

export const routesArray: Path[] = [
	{
		path: ['/'],
		exact: false,
		component: lazy(() => import('../../Views/Layout')),
	},
	{
		path: ['*'],
		exact: true,
		component: () => <Navigate to={'/'} />,
	},
];

export default routesArray;
