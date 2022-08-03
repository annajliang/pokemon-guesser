import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <div>
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
};

export default App;
