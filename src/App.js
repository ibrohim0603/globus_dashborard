import Layout from "./components/Layout/Layout";
import RoutesWrapper from "./Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Layout>
          <RoutesWrapper />
        </Layout>
      </QueryClientProvider>
    </div>
  );
}

export default App;
