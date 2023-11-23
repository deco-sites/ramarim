import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Custom CSS file */}
      <link href={asset("/global.css")} rel="stylesheet" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      <style 
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: "Commissioner";
              src: url("${asset("/fonts/Commissioner-Light.woff2")}");
              font-weight: light;
            }

            @font-face {
              font-family: "Commissioner";
              src: url("${asset("/fonts/Commissioner-Medium.woff2")}");
              font-weight: medium;
            }

            @font-face {
              font-family: "Commissioner";
              src: url("${asset("/fonts/Commissioner-Regular.woff2")}");
              font-weight: regular;
            }
            
            @font-face {
              font-family: "Commissioner";
              src: url("${asset("/fonts/Commissioner-SemiBold.woff2")}");
              font-weight: 600;
            }
          `
        }}
      />
    </Head>
  );
}

export default GlobalTags;
