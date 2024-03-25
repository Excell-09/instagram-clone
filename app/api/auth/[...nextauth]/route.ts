import NextAuth, { AuthOptions, Session } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import AppAxios from "../../../../utils/AppAxios";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userIdentify: { label: "userIdentify", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                {
                  username: credentials?.userIdentify,
                },
                {
                  email: credentials?.userIdentify,
                },
              ],
            },
          });

          if (!user) {
            return null;
          }

          const isPasswordTrue = await bcrypt.compare(
            credentials?.password as string,
            user.password!
          );

          if (!isPasswordTrue) {
            return null;
          }

          const currentUser = {
            id: user.id,
            email: user.email as string,
            image: user.image_url as string,
            name: user.username as string,
          };

          return currentUser;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { name, email } = user;
        try {
          const userExists = await prisma.user.findUnique({
            where: {
              email: email!,
            },
          });

          if (!userExists) {
            await AppAxios.post("/auth/register", {
              username: name,
              email,
              image_url: user.image,
            });
          }
        } catch (error) {
          return false;
        }
      }

      return true;
    },
    async session({ session }: { session: Session }) {
      const currentUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: session.user.email! },
            { username: session.user.name! },
          ],
        },
      });

      session.user.id = currentUser!.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
