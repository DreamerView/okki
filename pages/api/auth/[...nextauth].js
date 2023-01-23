const AesEncryption = require('aes-encryption');
const platform = require('platform');
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import VkProvider from "next-auth/providers/vk";

const nextAuthOptions = (req, res) => {
  return {
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
    // events: {
    //   async signIn(message) {
    //     console.log(message);
    //   }
    // },
    callbacks: {
      async signIn({account}) {
        return account;
      },
      async jwt({ token, user,account }) {
        return { ...token, ...user,...account }
      },
      async session({token}) {
        // console.log(token);
        return {token,success:true};
      }
    },
    pages: {
      signIn: "/signin",
    },
    secret: process.env.JWT_SECRET
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};