import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			user_first_name: string;
			access_token: string;
			user_level: string;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user_first_name: string;
		user_level: string;
		access_token: string;
	}
}
