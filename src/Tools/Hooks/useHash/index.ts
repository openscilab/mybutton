import { useLocation, useNavigate } from 'react-router-dom';
import { urlHashes as getHashesArray } from '../../Utils/String';

const useHash = () => {
	const navigate = useNavigate();
	const { hash: urlHash, search, pathname } = useLocation();

	const urlHashes = getHashesArray(urlHash);

	const hasHash = (...hashes: string[]) => hashes?.every(h => urlHashes?.includes(h));

	const addHash = async (...hashes: string[]) => {
		const canAddHashes = hashes?.filter(h => !urlHashes?.includes(h));
		if (canAddHashes?.length === 0) return;
		navigate(pathname + search + urlHash + '#' + canAddHashes?.join('#'), { replace: true });
	};

	const removeHash = async (...hashes: string[]) => {
		const canRemoveHashes = hashes?.filter(h => urlHashes?.includes(h));
		if (canRemoveHashes?.length === 0) return;
		let removedHashes = urlHash;
		canRemoveHashes?.forEach(crm => (removedHashes = removedHashes?.replace(`#${crm}`, '')));
		navigate(pathname + search + removedHashes, { replace: true });
	};

	const modifyHash = (add: string[] = [], remove: string[] = []) => {
		let modifiedHash = urlHash;
		remove?.forEach(rh => hasHash(rh) && (modifiedHash = modifiedHash?.replace(`#${rh}`, '')));
		add?.forEach(ah => !hasHash(ah) && (modifiedHash = `#${ah}` + modifiedHash));
		navigate(pathname + search + modifiedHash, { replace: true });
	};

	return {
		hasHash,
		addHash,
		removeHash,
		modifyHash,
		hashes: urlHashes,
	};
};

export default useHash;
