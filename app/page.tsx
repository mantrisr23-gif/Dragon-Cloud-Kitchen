import { prisma } from "@/lib/prisma";
import HomeUI from "./HomeUI";

export default async function Home() {
  // 1. Fetch the live menu securely on the server
  const liveMenu = await prisma.product.findMany();

  // 2. Pass it safely down to your interactive client UI
  return <HomeUI liveMenu={liveMenu} />;
}