import { redirect } from "next/navigation";

// /home now leads to the splash page at the root.
export default function Home() {
  redirect("/");
}
