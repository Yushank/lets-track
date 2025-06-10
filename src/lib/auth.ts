import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import {prisma} from '@/src/db'
import bcrypt from 'bcrypt'


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "peter@gmail.com"},
                password: {label: "Password", type: "text", placeholder: "password"},
            },

            async authorize(credentials): Promise<{id: string} | null>{
                if(!credentials) return null;

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.username
                    }
                });

                if(!user) return null;

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if(isPasswordValid){
                    return {id: String(user.id)}
                };

                return null;
            }
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        jwt: async ({token, user}) => {
            if(user){
                token.uid = user.id
            }
            return token;
        },

        session: async ({session, token}) => {
            if(session.user){
                session.user.id = token.uid as string
            }
            return session;
        }
    },

    pages: {
        signIn: "/signin"  //for custom signin page not default auth signin page
    }
}