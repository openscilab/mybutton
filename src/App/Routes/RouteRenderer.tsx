import routesArray from './routes';
import LoadingCover from '../../Components/LoadingCover';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LazyExoticComponent, Suspense, useRef } from 'react';

export type Path = {
	exact: boolean;
	path: string[];
	component: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element) | FC;
};

export type RouteRendererProps = {
	base?: string;
	routes?: Path[];
	defaultRoute?: string;
	fallback?: () => JSX.Element;
};

const RouteRenderer: FC<RouteRendererProps> = props => {
	const isFirstRenderRef = useRef(true);
	const { fallback, base = '', defaultRoute, routes = routesArray } = props;
	const is_default_route_redirect = !!(isFirstRenderRef.current && defaultRoute);

	let DefaultRoute;
	if (is_default_route_redirect) {
		isFirstRenderRef.current = false;
		DefaultRoute = <Route key='default' path={base} element={<Navigate to={base + defaultRoute} replace />} />;
	}

	return (
		<Suspense fallback={fallback?.() || <LoadingCover />}>
			<Routes>
				{DefaultRoute}
				{routes.map((route, i) =>
					route.path.map(path => {
						return <Route key={i} path={`${base}${path}`} element={<route.component />} />;
					})
				)}
			</Routes>
		</Suspense>
	);
};

export default RouteRenderer;
