import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import {Satisfy, DM_Sans} from '@next/font/google';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const dmSans = DM_Sans({
  weight: ['400','500','700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const satisfy = Satisfy({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-satisfy',
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
  <UserProvider>
    <main className={`${dmSans.variable} ${satisfy.variable} font-body`}>
    {getLayout(<Component {...pageProps} />, pageProps )}
    </main>
    </UserProvider>
  );
}

export default MyApp
