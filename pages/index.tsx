import { Session } from "next-auth";
import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

type Props = {
  session: Session;
  HandleSignOut: () => void;
};

async function HandleSignOut() {
  signOut();
}

export default function Component() {
  const { data: session } = useSession();
  // console.log(session)

  return (
    <>
      <Head>
        <title>NextAuth_Firebase</title>
      </Head>
      {session ? AuthorizedUser({ session, HandleSignOut }) : Guest()}
    </>
  );
}

function Guest() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h3 className="my-2 font-bold">Guest Homepage</h3>
      <div>
        <Link
          href={"/login"}
          className="bg-blue-600 text-[#eee] p-2 rounded-md"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}

function AuthorizedUser({ session, HandleSignOut }: Props) {
  return (
    <main className="flex flex-col items-center justify-center">
      <h3 className="my-2 font-bold">Authorized User Homepage</h3>
      <div className="my-2">
        <h5>{session.user?.name}</h5>
        <h5>{session.user?.email}</h5>
      </div>
      <div className="my-2">
        <Link
          href={"/login"}
          className="bg-blue-600 text-[#eee] p-2 rounded-md"
        >
          <button onClick={HandleSignOut}>Sign Out</button>
        </Link>
      </div>
      <div className="my-2">
        <Link
          href={"/profile"}
          className="bg-blue-600 text-[#eee] p-2 rounded-md"
        >
          Profile
        </Link>
      </div>
    </main>
  );
}

// if we dont this protected route than we redirect user to as a guest

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

/* Next.js 12 
If you export a function called getServerSideProps (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps. */
