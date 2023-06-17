import './globals.css';
import { Inter } from 'next/font/google';
import { ClientWrapper } from './ClientWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HstarAuth',
  description: 'Hstar 统一认证中心',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/layui/css/layui.css" />
        {/* <Script src="layui/layui.js" /> */}
      </head>
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
