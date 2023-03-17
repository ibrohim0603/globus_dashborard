import Layout from "./components/Layout/Layout";
import RoutesWrapper from "./Routes";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { useLang } from "./utils/state";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    lng: localStorage.getItem("lang") || "en",
    support: ["en", "uz", "ru"],
    fallbacklang: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["htmlTag", "cookie", "localStorage", "subdomain", "path"],
      cashes: ["cookie"],
    },
    backend: {
      loadPath: "./translation/{{lng}}/tr.json",
    },
    react: { useSuspence: false },
  });

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3a6963",
          },
        }}
      >
        <div className="App">
          <QueryClientProvider client={queryClient}>
            <Layout>
              <RoutesWrapper />
            </Layout>
          </QueryClientProvider>
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
