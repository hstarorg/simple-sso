import {router} from '@/middleware/auth'
export default function AuthPage({ params, searchParams }: any) {

  // router.run(req)

  const provider = params.provider;
  console.log(params, provider);
  return <div>sss</div>;
}
