import { getSession, useSession } from "next-auth/react";
import Link from "next/link";

function profile() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();
  return (
    <section className="container mx-auto text-center">
      <h3 className="text-2xl font-bold">Profile Page</h3>
      <p>{session?.user?.email}</p>

      <div className="my-2">
        <Link href={"/"} className="bg-blue-600 text-[#eee] p-2 rounded-md">
          <button>Home</button>
        </Link>
      </div>
    </section>
  );
}

export default profile;

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
