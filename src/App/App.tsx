import '@assets/less/rsuite.config.less';
import '@assets/scss/base/export.scss';
import '@assets/scss/base/RSuite.scss';
import '@assets/scss/App.scss';
import '@assets/scss/base/tailwind.scss';
import RoutesRenderer from './Routes/RouteRenderer';
import { useEffect } from 'react';
import { isDev } from '../Tools/Utils/React';

const App = () => {
	//? ------------------------------ useEffects ------------------------------------------------------

	useEffect(() => {
		isDev && (window.logs = true);
	}, []);

	// -------------------------------------------------------------------------------------------------
	return <RoutesRenderer />;
};

export default App;
