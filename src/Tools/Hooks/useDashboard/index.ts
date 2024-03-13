import useStore from '../../Store/useStore';

const useDashboard = () => {
	const { selector } = useStore();
	return selector(s => s.dashboard);
};

export default useDashboard;
