import { UserHome } from './_components/UserHome';
import { getUserInfo } from '../../server/bizs/userBiz';
import NextAuth, { getServerSession } from 'next-auth';

export default async function Home() {
  const seesion = await getServerSession({
    callbacks: {
      session({ session, token }) {
        return { ...session, unionId: token.sub };
      },
    },
  });
  const user = await getUserInfo(seesion?.unionId!);

  return <UserHome user={{ ...user }} />;
}
