import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@models/user';

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    //* Creates a new user if it doesn't already exist in DB
    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });
        // if not, create  a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            //!todo CHECK THAT IT'S USERNAME AND NOT NAME...
            username: profile.name.replace(' ', '').toLowerCase(), // The replace is making sure that there are no spaces
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
