import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const nums = Array.from(Array(251), (_, index) => index + 1);

const preloadedPokemonImages = nums.map((num) => {
  if (num < 10) {
    return (
      <link
        rel="prefetch"
        as="image"
        href={`/pokemon/gen1/00${num}.png`}
        key={`/pokemon/gen1/00${num}.png`}
      />
    );
  } else if (num >= 10 && num < 100) {
    return (
      <link
        rel="prefetch"
        as="image"
        href={`/pokemon/gen1/0${num}.png`}
        key={`/pokemon/gen1/0${num}.png`}
      />
    );
  } else if (num > 100 && num <= 151) {
    return (
      <link
        rel="prefetch"
        as="image"
        href={`/pokemon/gen1/${num}.png`}
        key={`/pokemon/gen1/${num}.png`}
      />
    );
  } else if (num > 151) {
    return (
      <link
        rel="prefetch"
        as="image"
        href={`/pokemon/gen2/${num}.png`}
        key={`/pokemon/gen2/${num}.png`}
      />
    );
  }
});

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Sen:wght@400;700&display=swap"
            rel="stylesheet"
            type="text/css"
          />
          {/* {preloadedPokemonImages} */}
          <link rel="prefetch" as="image" href={`/pokemon/gen1/001.png`} />
        </Head>
        <body>
          <script>0</script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
