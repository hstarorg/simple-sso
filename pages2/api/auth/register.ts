// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { mysqlHelper, SqlManager } from '../../../libs';

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
  const registerDto = req.body;
  if (!registerDto?.username || !registerDto?.password) {
    res.status(400).json({ message: '必须提供账户和密码' });
    return;
  }

  // const passwordHash = util.hashPassword(loginDto.password);
  // console.log(findUser, passwordHash);
  // if (
  //   findUser?.UserName === loginDto.username &&
  //   findUser?.Password === passwordHash
  // ) {
  //   res.status(200).json({ message: '登录成功' });
  // } else {
  //   res.status(400).json({ message: '账号或密码不正确' });
  // }
}
