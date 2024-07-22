import '@assets/less/rsuite.config.less';
import '@assets/scss/base/export.scss';
import '@assets/scss/base/RSuite.scss';
import '@assets/scss/App.scss';
import '@assets/scss/base/tailwind.scss';
import RoutesRenderer from './Routes/RouteRenderer';

const App = () => {
	return <RoutesRenderer />;
};

export default App;
