import AuthCard from "components/AuthCard";
import Footer from "components/Footer";
import LoadingScreen from "components/LoadingScreen";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { isUserAuth, logUserIn } from "services/authServices";

export default function Login() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isUserAuth((user, error) => {
      if (!user) setIsLoading(false);
      else Router.push("/");
    });
  }, []);

  const btnClickHandler = (email, password) => {
    logUserIn({ email, password }, (data, err) => {
      // console.table(data)
      // console.table(error)
      if (data?.errors) setError(data.errors);
      else if (data?.user) Router.push("/");
      else if (err)
        setError({ errors: { error: "Oops! something went wrong" } });
    });
  };
  if (isLoading) return <LoadingScreen />;
  return (
    <>
      <Head>
        <title>Auth app | Login</title>
      </Head>
      <div className="fixed inset-0 sm:flex justify-center items-center overflow-scroll">
        <div>
          <AuthCard
            title="Login"
            buttonText="Login"
            btnClickHandler={btnClickHandler}
            error={error}
            setError={setError}
          >
            <p className="mt-4">
              Don't have an account yet?{" "}
              <Link href="/signup">
                <span className="text-blue-500 dark:text-blue-400 cursor-pointer">
                  Register
                </span>
              </Link>
            </p>
          </AuthCard>

          <Footer className="mt-3 hidden sm:flex max-w-md" />
        </div>
      </div>
    </>
  );
}
