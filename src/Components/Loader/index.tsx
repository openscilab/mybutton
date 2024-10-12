import './index.scss';

const Loader = () => {
	return (
		<div className={'loader-layout'}>
			{[...Array(9)].map((_, index) => (
				<div key={index} className='loading-circle' />
			))}
		</div>
	);
};

export default Loader;
