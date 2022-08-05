import '../styles/global.css';
import Image from 'next/image';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Normalize } from '../styles/Normalize';
import { Global } from '../styles/Global';
import { Layout } from '../components/Layout/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Normalize />
      <Global />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};

export default App;
