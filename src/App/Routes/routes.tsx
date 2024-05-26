import { lazy } from 'react';
import { Path } from './RouteRenderer';

export const routesArray: Path[] = [
	{
		path: ['/share'],
		exact: false,
		component: lazy(() => import('../../Views/Pages/Share')),
	},
	{
		path: ['*'],
		exact: false,
		component: lazy(() => import('../../Views/Layout')),
	},
];

export default routesArray;
