import { createContext } from "react";

const LoadingContext = createContext({
  loading: true,
  setLoading: (val) => {
    loading = val;
  },
});
export default LoadingContext;
