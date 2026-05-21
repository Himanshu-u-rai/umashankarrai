"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { LANG_LOCALE, SUPPORTED_LANGS, isSupportedLang } from "../data/i18n";

const STORAGE_KEY = "umrai.lang";
const DEFAULT_LANG = "en";

const LangContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

function detectInitialLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isSupportedLang(stored)) return stored;
  } catch {
    // localStorage may be unavailable (private mode, SSR, etc.)
  }
  const navLang = typeof navigator !== "undefined" ? navigator.language : "";
  if (navLang && navLang.toLowerCase().startsWith("hi")) return "hi";
  return DEFAULT_LANG;
}

/**
 * Subscribe-from-window pattern (avoids `react-hooks/set-state-in-effect`).
 * The "external system" is `localStorage` + `navigator.language`; we treat
 * lang as a synchronised external value via `useSyncExternalStore`.
 */
const langStore = (() => {
  let current = DEFAULT_LANG;
  let initialised = false;
  const listeners = new Set();

  function read() {
    if (typeof window === "undefined") return DEFAULT_LANG;
    if (!initialised) {
      current = detectInitialLang();
      initialised = true;
    }
    return current;
  }

  function write(next) {
    if (!isSupportedLang(next)) return;
    current = next;
    initialised = true;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage failures
    }
    listeners.forEach((cb) => cb());
  }

  function subscribe(cb) {
    listeners.add(cb);
    // Cross-tab sync: pick up changes made elsewhere.
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY && isSupportedLang(event.newValue)) {
        current = event.newValue;
        listeners.forEach((fn) => fn());
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
    }
    return () => {
      listeners.delete(cb);
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onStorage);
      }
    };
  }

  return { read, write, subscribe };
})();

export function LangProvider({ children }) {
  // `useSyncExternalStore` gives us the right hydration story: server gets
  // the default snapshot, client transitions to the persisted value without
  // calling setState inside an effect.
  const lang = useSyncExternalStore(
    langStore.subscribe,
    langStore.read,
    () => DEFAULT_LANG,
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("lang", LANG_LOCALE[lang] ?? lang);
    root.setAttribute("data-lang", lang);
  }, [lang]);

  const setLang = useCallback((next) => {
    langStore.write(next);
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export { SUPPORTED_LANGS };
