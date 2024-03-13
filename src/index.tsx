import App from './App/App';
import { createRoot } from 'react-dom/client';
import './Assets/scss/index.scss';
import Store from './Tools/Store';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

const app = (
	<ErrorBoundary>
		<BrowserRouter>
			<Store>
				<App />
			</Store>
		</BrowserRouter>
	</ErrorBoundary>
);

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(app);
reportWebVitals();
