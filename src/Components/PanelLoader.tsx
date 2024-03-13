import loadingSvg from '../Assets/icons/loading.svg';

const PanelLoader: FC<{ loading?: boolean; className?: string }> = props => {
	const { children, className, loading = false } = props;

	if (!loading) return <div className='panel-loader-wrapper'>{children}</div>;

	const classes = `panel-loader flex-center overflow-hidden opacity-100 w-full ${className}`;

	return (
		<div className={classes}>
			<img className='loading-image' src={loadingSvg} alt='loading' />
		</div>
	);
};

export default PanelLoader;
