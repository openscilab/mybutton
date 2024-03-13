import useStore from '../../Store/useStore';

const useLocalCache = () => {
	const { selector } = useStore();
	return selector(s => s.localStorage);
};

export default useLocalCache;
