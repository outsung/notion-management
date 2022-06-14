import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";

export default function Login() {
  const { data: session } = useSession();

  console.log("session: ", session);
  useEffect(() => {
    session?.error === "RefreshAccessTokenError" && signIn();
  }, [session]);

  const getCalendarList = () => {
    fetch("api/calendar/list")
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
      });
  };

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        token: {session.accessToken} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <br />
        <br />
        <br />
        <button onClick={getCalendarList}>list 요청</button>
        <br />
        <br />
        <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={getCalendarList}>list 요청</button>
    </>
  );
}
