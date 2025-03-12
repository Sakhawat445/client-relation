import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Dashboard() {
  return <h1>Welcome to your Dashboard</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: {} };
};
