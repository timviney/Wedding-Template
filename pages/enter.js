import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { WEDDING_DETAILS } from '../constants';

const pageVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: {
    x: "-100%",
    transition: {
      duration: 1.1
    }
  }
};

const errorVariants = {
  initial: { opacity: 0, x: 0 },
  animate: {
    opacity: 1,
    x: [0, -6, 6, -4, 4, 0],
    transition: {
      duration: 0.6,
      ease: "linear"
    }
  }
};

export default function Enter() {  
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [errKey, setErrKey] = useState(0);
  const { login } = useAuth();
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    const ok = login(pw);

    if (ok) {
      sessionStorage.setItem("fromEnter", "1");
      router.push("/", undefined, { state: { fromEnter: true } });
    } else {
      setErr("Incorrect password.");
      setErrKey((n) => n + 1);
    }
  };

  return (
    <motion.div
      className="bg-secondary-100 min-h-screen flex items-center justify-center p-6"
      variants={pageVariants}
      initial="initial"
      animate="initial"
      exit="exit"
    >
      <div className="w-full max-w-md mx-auto bg-background rounded-xl shadow-sm p-10 border border-neutral-200">
        <h1 className="text-center font-sans text-3xl text-neutral-800 tracking-tight mb-1">
          Welcome
        </h1>
        <p className="text-center text-neutral-500 mb-8">
          Please enter the password
        </p>

        <form onSubmit={submit} className="space-y-6">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full bg-background-light rounded-lg border border-neutral-300 px-4 py-3 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            placeholder="Password"
          />

          {err && (
            <motion.p
              key={errKey}
              variants={errorVariants}
              initial="initial"
              animate="animate"
              className="text-sm text-red-500 text-center -mt-4"
            >
              {err}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-text-light py-3 rounded-lg font-medium tracking-wide hover:bg-primary-200 transition-colors"
          >
            Enter
          </button>
        </form>

        <div className="mt-10 flex items-center">
          <div className="flex-grow h-px bg-neutral-200" />
          <span className="px-3 text-neutral-400 text-sm font-light">{WEDDING_DETAILS.initials}</span>
          <div className="flex-grow h-px bg-neutral-200" />
        </div>
      </div>
    </motion.div>
  );
}