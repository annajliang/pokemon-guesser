import '../styles/fonts.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Normalize } from '../styles/Normalize';
import { Global } from '../styles/Global';
import { Animations } from '../styles/Animations';
import { Layout } from '../components/Layout/Layout';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Normalize />
      <Global />
      <Animations />
      <Head>
        <title>Who&apos;s That Pokemon?</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};

export default App;
