"use client";

import { useState, ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { I18nProviderClient } from "@/app/i18n/i18n.client";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";
import { theme } from "./theme";

interface ProvidersProps {
  locale: string;
  children: ReactNode;
}

// This implementation is based on the official MUI documentation for Next.js App Router.
// https://mui.com/material-ui/guides/next-js-app-router/

export function Providers({ locale, children }: ProvidersProps) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui-style" });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <I18nProviderClient locale={locale}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </I18nProviderClient>
  );
}
