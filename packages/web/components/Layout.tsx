import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Fweb 3</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>{children}</main>
    </>
  )
}
