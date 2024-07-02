import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link className="text-xl" href={"/login"}>
        Login
      </Link>
    </>
  );
}
