"use client";

import { User } from "@/types/user";
import { signOut } from "next-auth/react";

type UserInfoProps = {
	user: User;
};

export default function UserInfo({ user }: UserInfoProps) {
	const handleLogout = async () => {
		await signOut({ callbackUrl: "/" });
	};

	return (
		<div className="rounded-lg border shadow-lg p-10 text-gray-900">
			<div>Id : {user.id}</div>
			<div>Name : {user.user_first_name}</div>
			<button
				className="font-medium mt-2 text-blue-600 hover:underline"
				onClick={handleLogout}
			>
				Log out
			</button>
		</div>
	);
}
