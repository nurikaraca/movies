import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Title from "./pages/Title";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/title/:id/:slug" element={<Title />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </>
    </QueryClientProvider>
  );
}
