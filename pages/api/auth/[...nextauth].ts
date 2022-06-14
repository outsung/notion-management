// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
// });

import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    console.log({ googleres: refreshedTokens });
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly",
          // scope: "openid email profile",
        },
      },
    }),
    CredentialsProvider({
      name: "ildaegi",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        code: { label: "Code", type: "password" },
      },
      id: "ildaegi",
      async authorize(credentials, req) {
        console.log(credentials);
        return {
          id: 1,
          name: "J Smith",
          email: "jsmith@example.com",
          image: "https://i.pravatar.cc/150?u=jsmith@example.com",
        };

        // const res = await fetch("/auth/login", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

        // console.log({ res });

        // if (res.ok && user) {
        //   return user;
        // }

        // return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      // account.access_token;
      console.log({ account });

      return account.provider === "ildaegi";
    },
    async jwt({ token, user, account }) {
      // console.log({ token, user, account });

      // if(provider: account.provider,)

      // Initial sign in
      if (account && user) {
        return {
          provider: account.provider,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_at || 3600) * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it
      return token.provider === "google"
        ? refreshAccessToken(token)
        : { ...token, error: "RefreshAccessTokenError" };
    },
    async session({ session, token }) {
      session.provider = token.provider;
      session.user = token.user as any;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
});
