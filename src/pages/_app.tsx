import { PrismicPreview } from '@prismicio/next';
import { PrismicProvider } from '@prismicio/react';
import { AppProps } from 'next/app';
import Link from "next/link";
import { repositoryName } from '../services/prismic';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PrismicProvider
      internalLinkComponent={({ href, ...props }) => (
        <Link href={href}>
          <a {...props} />
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>
          <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  );
}

export default MyApp;
