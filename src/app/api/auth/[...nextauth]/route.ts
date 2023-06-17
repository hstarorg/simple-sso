import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { QQProvider } from './providers/QQProvider';
import CredentialsProvider from 'next-auth/providers/credentials';
import { doNormalLogin } from '../../../../server/bizs/testBiz';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const authOptions: NextAuthOptions = {
  debug: true,
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'username', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const data = await doNormalLogin(credentials!);
          console.log('goid', credentials, data);
          return {
            id: data.UnionId,
            name: data.UserName,
            email: data.EmailAddress,
            image: data.AvatarUrl,
          };
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
    QQProvider({
      clientId: process.env.QQ_ID!,
      clientSecret: process.env.QQ_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    //   version: "2.0",
    // }),
  ],
  callbacks: {
    async session(params) {
      const { session, token, user } = params;
      console.log('ppppppppppppppppppp', params);
      return { ...session, unionId: token.sub };
    },
  },
  events: {
    // signIn,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
