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
		microsite_user_id: string;
		user_email: string;
		account_id: string;
		user_extension?: string;
		user_first_name: string;
		user_last_name: string;
		user_level: string;
		user_status: string;
		user_created_date: string;
		user_created_by: string;
		access_token: string;
	}
}
