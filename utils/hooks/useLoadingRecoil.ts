import { loadingState } from '@/atom/loadingAtom';
import { useRecoilState } from 'recoil';

export default function useLoadingRecoil() {
  const [loading, setLoading] = useRecoilState(loadingState);
  return { loading, setLoading };
}
