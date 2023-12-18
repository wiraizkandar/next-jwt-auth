import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userService } from "./services/userService";
import { User } from "@/types/user";

export const authOptions: NextAuthOptions = {
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				token.userId = user.microsite_user_id;
				token.access_token = user.access_token;
				token.user_first_name = user.user_first_name;
				token.user_level = user.user_level;
			}
			return token;
		},
		async session({ session, token, user }) {
			if (token) {
				session.user.id = token.userId; //(3)
				session.user.user_first_name = token.user_first_name; //(3)
				session.user.access_token = token.access_token; //(3)
				session.user.user_level = token.user_level; //(3)
			}

			return session;
		},
	},
	pages: {
		signIn: "/",
		signOut: "/",
	},
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {},
			async authorize(credentials, req) {
				const { username, password } = credentials as {
					username: string;
					password: string;
				};

				return userService.authenticate(username, password) as User; //(5)
			},
		}),
	],
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6)
