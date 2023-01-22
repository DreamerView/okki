import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import VkProvider from "next-auth/providers/vk";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({account}) {
      return account;
    },
    async jwt({ token, user,account }) {
      return { ...token, ...user,...account }
     },
    async session({ session, user, token }) {
      return token
     }
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.JWT_SECRET
}
export default NextAuth(authOptions)