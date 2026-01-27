import '../styles/globals.css'
import Head from 'next/head'
import { AuthProvider } from "../context/AuthContext";
import { Gatekeeper } from "../context/GateKeeper";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { WEDDING_DETAILS } from "../constants"

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider>
      <Gatekeeper>
        <Head>
          <title>{WEDDING_DETAILS.partner1} and {WEDDING_DETAILS.partner2} getting married</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={router.asPath}
            className="w-full h-full"
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Gatekeeper>
    </AuthProvider>
  );
}