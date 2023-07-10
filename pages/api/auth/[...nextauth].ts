import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminDB } from "@/adminfirebase";
import { compare } from "bcryptjs";

type Props = {
  email: string;
  password: string;
};

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",

      async authorize({ email, password }: Props) {
        const result = await adminDB
          .collection("users")
          .where("email", "==", email)
          .get();

        if (result.empty) {
          return null;
        } else {
          const user = result.docs[0].data();
          const checkPassword = await compare(password, user?.password);
          if (!checkPassword || user?.email !== email) {
            return null;
          }
          return user;
        }
      },
    }),
  ],
});
