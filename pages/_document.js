import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

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
          <link rel="preload" as="image" href={`/pokemon/gen1/001.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/002.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/003.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/004.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/005.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/006.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/007.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/008.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/009.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/010.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/011.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/012.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/013.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/014.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/015.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/016.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/017.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/018.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/019.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/020.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/021.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/022.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/023.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/024.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/025.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/026.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/027.png`} />
          <link rel="preload" as="image" href={`/pokemon/gen1/028.png`} />
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
