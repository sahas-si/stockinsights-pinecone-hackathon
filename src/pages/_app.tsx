import '../styles/global.css';
import type { AppProps } from 'next/app';
// eslint-disable-next-line import/extensions
import Layout from './Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
