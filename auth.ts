import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import Slack from "next-auth/providers/slack";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "https://site-assets.fontawesome.com/releases/v7.0.0/svgs-full/solid/pencil.svg",
  },
  providers: providers(),
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
});

function providers() {
  const providers = []
  if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
    providers.push(Google({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        }
      }
    }));
  }
  if (process.env.AUTH_SLACK_ID && process.env.AUTH_SLACK_SECRET) {
    providers.push(Slack({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      }
    }));
  }
  return providers;
}