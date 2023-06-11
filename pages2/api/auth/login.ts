// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SqlManager, mysqlHelper, util } from '../../../libs';
import { LoginDto } from '../../../typings/LoginDto';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: '接口不存在' });
  }
  const loginDto: LoginDto = req.body;
  if (!loginDto?.username || !loginDto?.password) {
    res.status(400).json({ message: '必须提供账户和密码' });
    return;
  }
  const findUser: any = await mysqlHelper.queryScalar(
    SqlManager.QUERY_USER_BY_NAME,
    [loginDto.username],
  );

  const passwordHash = util.hashPassword(loginDto.password);
  if (
    findUser?.UserName === loginDto.username &&
    findUser?.Password === passwordHash
  ) {
    res.status(200).json({ message: '登录成功' });
  } else {
    res.status(400).json({ message: '账号或密码不正确' });
  }
}
