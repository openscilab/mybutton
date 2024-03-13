import { lazy } from 'react';
import { Path } from './RouteRenderer';
import { Navigate } from 'react-router-dom';
import { CONFIG } from '../Config/constants';

export const routesArray: Path[] = [
	{
		path: ['/', '/home'],
		component: lazy(() => import('../../Views/Pages/Home')),
	},
	{
		path: ['*'],
		component: () => <Navigate to={CONFIG.BASE_URL} />,
	},
];

export default routesArray;
