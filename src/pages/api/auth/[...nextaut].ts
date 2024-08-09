/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-09 08:57:49
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-09 09:32:15
 * @FilePath     : /earthworm/src/pages/api/auth/[...nextaut].ts
 * @FileName     :
 */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiHandler } from 'next';
import NextAuth, { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '@lib/prisma';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

export default authHandler;
