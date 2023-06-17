import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

export function QQProvider<P>(options: OAuthUserConfig<P>): OAuthConfig<P> {
  return {
    id: 'qq',
    name: 'QQ',
    type: 'oauth',
    authorization: {
      url: 'https://graph.qq.com/oauth2.0/authorize',
      params: { scope: 'read:user user:email' },

    },
    token: 'https://graph.qq.com/oauth2.0/token',
    userinfo: {
      url: 'https://graph.qq.com/oauth2.0/me',
      async request({ client, tokens }) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const profile = await client.userinfo(tokens.access_token!, {
          params: { fmt: 'json' },
        });

        // if (!profile.email) {
        //   // If the user does not have a public email, get another via the GitHub API
        //   // See https://docs.github.com/en/rest/users/emails#list-public-email-addresses-for-the-authenticated-user
        //   const res = await fetch('https://api.github.com/user/emails', {
        //     headers: { Authorization: `token ${tokens.access_token}` },
        //   });

        //   if (res.ok) {
        //     const emails: GithubEmail[] = await res.json();
        //     profile.email = (emails.find(e => e.primary) ?? emails[0]).email;
        //   }
        // }

        return profile;
      },
    },
    profile(profile:any) {
      return {
        id: profile.id.toString(),
        name: profile.name ?? profile.login,
        email: profile.email,
        image: profile.avatar_url,
      };
    },
    style: {
      bg: '#fff',
      bgDark: '#000',
      text: '#000',
      textDark: '#fff',
    },
    options,
  };
}
