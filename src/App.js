import Layout from "./components/Layout/Layout";
import RoutesWrapper from "./Routes";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
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
  );
}

export default App;
