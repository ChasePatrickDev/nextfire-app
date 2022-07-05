import Head from "next/head";
export default function MetaTags({
  title = "NextBase",
  description = "The personal blogging site for self taught devs - Made by a self taught dev",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@chasepatrickdev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
}
