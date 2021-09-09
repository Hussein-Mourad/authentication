import Footer from "components/Footer";
import LoadingScreen from "components/LoadingScreen";
import NavBar from "components/NavBar";
import Profile from "components/Profile";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import { isUserAuth } from "services/authServices";

export default function index() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({ name: "", photo: "", email: "" });
  useEffect(() => {
    isUserAuth((user, error) => {
      // console.table(user, error);
      if (!user) Router.push("/login");
      else {
        setIsLoading(false);
        setUser(user);
      }
    });
  }, []);

  if (isLoading) return <LoadingScreen />;
  else
    return (
      <>
        <Head>
          <title>Auth app</title>
          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src *;
   img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *;
   style-src  'self' 'unsafe-inline' *"
          />
        </Head>
        <NavBar user={user} />
        <div className="mx-auto mt-8 flex flex-col items-center justify-center text-gray-800 dark:text-gray-100 max-w-3xl">
          <h1 className="text-3xl">Personal info</h1>
          <p className="mt-2 dark:text-gray-200">
            Basic info, like your name and photo
          </p>
          <Profile user={user} />
          <Footer className="flex mt-2" />
        </div>
      </>
    );
}
