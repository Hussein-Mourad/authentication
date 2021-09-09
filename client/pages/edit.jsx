import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Footer from "components/Footer";
import LoadingScreen from "components/LoadingScreen";
import NavBar from "components/NavBar";
import ProfileEdit from "components/ProfileEdit";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { isUserAuth } from "services/authServices";

export default function edit() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    isUserAuth((user, error) => {
      // console.table(user, error);
      if (!user) Router.push("/login");
      else {
        var tmp = user;
        tmp.password = "*".repeat(user?.passwordLength);
        setIsLoading(false);
        setUser(tmp);
      }
    });
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (user)
    return (
      <>
        <Head>
          <title>Auth app | Edit</title>

          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src *;
   img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *;
   style-src  'self' 'unsafe-inline' *"
          />
        </Head>
        <NavBar user={user} />
        <div className="mx-auto mt-8 flex flex-col text-gray-800 dark:text-gray-100 max-w-3xl">
          <Link href="/">
            <button className="flex items-center text-blue-400 text-base focus:outline-none">
              <ChevronLeftIcon className="mr-1" /> Back
            </button>
          </Link>
          <ProfileEdit user={user} setUser={setUser} />
          <Footer className="flex mt-2" />
        </div>
      </>
    );

  return <></>;
}
