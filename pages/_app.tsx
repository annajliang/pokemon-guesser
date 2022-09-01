import '../styles/global.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Normalize } from '../styles/Normalize';
import { Global } from '../styles/Global';
import { Animations } from '../styles/Animations';
import { Layout } from '../components/Layout/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Normalize />
      <Global />
      <Animations />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};

export default App;
