import './ErrorBoundary.scss';
import { Component } from 'react';
import { Button } from 'rsuite';
import { isDev } from '../../Tools/Utils/React';
import { ReactComponent as Exclamation } from '@assets/icons/exclamation-solid.svg';

interface EBProps {
	children?: React.ReactNode;
}

export default class ErrorBoundary extends Component<EBProps> {
	state = { hasError: false, remainTime: 10 };

	static getDerivedStateFromError(error: any) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		// You can also log the error to an error reporting service
		if (isDev) return;
		console.error(error, errorInfo);
		const interval = setInterval(() => {
			this.setState((s: any) => {
				if (s.remainTime === 0) {
					window.location.href = '/';
					return clearInterval(interval);
				}
				return { ...s, remainTime: s.remainTime - 1 };
			});
		}, 1000);
	}

	render() {
		if (!this.state.hasError) return this.props.children;
		return (
			<div className='error-boundary-layout'>
				<Exclamation className='w-1/3 icon' />
				<h1>Something went wrong !</h1>
				<Button href='/' className='go-to-home-btn'>
					Back to home
					{this.state.remainTime !== 0 ? ` (${this.state.remainTime}s)` : ''}
				</Button>
				<Button className='report-btn' href='mailto:mybutton@openscilab.com'>
					Report to OSL
				</Button>
			</div>
		);
	}
}
