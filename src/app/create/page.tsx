import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import CreateClient from "./CreateClient";

export default async function CreatePage() {
  const session = await auth();

  console.log("session", session)
  if (!session) redirect('/api/auth/signin')
  return <CreateClient/>;
}

