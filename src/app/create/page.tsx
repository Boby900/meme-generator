import { auth } from "../../../auth";
import CreateClient from "./CreateClient";

export default async function CreatePage() {
  const session = await auth();

  console.log("session", session)
  return <CreateClient/>;
}

