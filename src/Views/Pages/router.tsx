import { lazy } from 'react';
import RouteRenderer, { Path } from '@src/App/Routes/RouteRenderer';
import Home from './Home/index';

const PagesRouter = () => <RouteRenderer {...{ routes }} />;

export const routes: Path[] = [
	{
		exact: true,
		path: ['*'],
		component: () => <Home />,
	},
];

export default PagesRouter;
