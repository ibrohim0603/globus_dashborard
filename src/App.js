import Layout from "./components/Layout/Layout";
import RoutesWrapper from "./Routes";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";

const queryClient = new QueryClient();
export const QueryContext = createContext();

function App() {
  return (
    <QueryContext.Provider value={{ queryClient }}>
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
    </QueryContext.Provider>
  );
}

export default App;
