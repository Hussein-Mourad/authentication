import  Head  from 'next/head';
export default function Layout({children}) {
  return (
    
    <div className="container mx-auto min-h-screen p-2 sm:p-5">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />{" "}
        <link rel="manifest" href="/site.webmanifest" />
        <title>Auth app</title>
      </Head>
      {children}
    </div>
  )
}
