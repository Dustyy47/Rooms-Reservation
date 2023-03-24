import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  return <>{user ? <pre>{JSON.stringify(user)}</pre> : 'no auth'}</>;
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (ctx) => {
//     await store.dispatch(usersActions.fetchUser());
//     return { props: {} };
//   }
// );
