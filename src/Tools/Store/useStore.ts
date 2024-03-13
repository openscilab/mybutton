import { StoreTypes } from '.';
import { useSelector, useDispatch } from 'react-redux';

type SelectorType = <TState = StoreTypes, TSelected = unknown>(
	selector: (state: TState) => TSelected,
	equalityFn?: ((left: TSelected, right: TSelected) => boolean) | undefined
) => TSelected;

const useStore = () => {
	const dispatch = useDispatch();
	const selector: SelectorType = useSelector;
	return { selector, dispatch };
};

//* how to use ?
// const {selector , dispatch} = useStore();
// dispatch(action()) , selector(state=>state.value)

export default useStore;
