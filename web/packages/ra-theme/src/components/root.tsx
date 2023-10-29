import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { connect, useConnect } from "frontity";
import { useEffect } from "react";
import { Packages } from "../../types";
import Index from "./index";

const queryClient = new QueryClient();

function Root() {
  const { state } = useConnect<Packages>();

  useEffect(() => {
    axios.defaults.baseURL = state.config.surveys.url;
  }, [state.config.surveys.url]);

  return (
    <QueryClientProvider client={queryClient}>
      <Index />
    </QueryClientProvider>
  );
}

export default connect(Root);
