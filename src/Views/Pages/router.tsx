import RouteRenderer, { Path } from '@src/App/Routes/RouteRenderer';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const PagesRouter = () => <RouteRenderer {...{ routes }} />;

export const routes: Path[] = [
	{
		path: ['/share'],
		exact: false,
		component: lazy(() => import('../Pages/Share')),
	},
	{
		path: ['/get'],
		exact: true,
		component: lazy(() => import('../Pages/GetButton')),
	},
	{
		path: ['/'],
		exact: false,
		component: lazy(() => import('../Pages/Home')),
	},
	{
		path: ['*'],
		exact: true,
		component: () => <Navigate to='/' />,
	},
];

export default PagesRouter;
