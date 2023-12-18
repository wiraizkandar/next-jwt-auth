import UserInfo from "@/components/UserInfo";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function HomePage() {
	const authSession = await getServerAuthSession(); //(1)

	return (
		<main className="flex items-center justify-center h-screen">
			{authSession?.user && <UserInfo user={authSession?.user} />}
		</main>
	);
}
