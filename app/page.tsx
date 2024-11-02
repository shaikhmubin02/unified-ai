import Neuronpage from "@/components/Neuronpage";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  // const { userId } = auth();

  // if (!userId) {
  //   redirect("/landing");
  // }

  return (
    <Neuronpage />
  );
}
