import routesArray from './routes';
import { RolePath } from './Guard';
import LoadingCover from '../../Components/LoadingCover';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROLE_NAME } from '../../Tools/Store/reducers/AccountReducer';
import { LazyExoticComponent, Suspense, Fragment, useRef } from 'react';

export type Path = {
	guard?: any;
	path: string[];
	role?: Partial<Record<'is' | 'not', ROLE_NAME[]>>;
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
						let PathGuard = route.guard || Fragment;
						return (
							<Route
								key={i}
								path={`${base}${path}`}
								element={
									<PathGuard>
										<RolePath is={route?.role?.is} not={route?.role?.not}>
											<route.component />
										</RolePath>
									</PathGuard>
								}
							/>
						);
					})
				)}
			</Routes>
		</Suspense>
	);
};

export default RouteRenderer;
