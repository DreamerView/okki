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
    async jwt({ token, user }) {
      // the user present here gets the same data as received from DB call  made above -> fetchUserInfo(credentials.opt)
    
      return { ...token, ...user }
     },
      async session({ session, user, token }) {
      // user param present in the session(function) does not recive all the data from DB call -> fetchUserInfo(credentials.opt)
    
      return token
     }
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.JWT_SECRET
}
export default NextAuth(authOptions)