import React from "react";
import useCancellable, { CancelInfo } from "./useCancellable";

export default function useAsync<T, E = string>(
  asyncFunction: (cancelInfo: CancelInfo) => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = React.useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [value, setValue] = React.useState<T | null>(null);
  const [error, setError] = React.useState<E | null>(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = React.useCallback(
    (cancelInfo: CancelInfo) => {
      setStatus("pending");
      setValue(null);
      setError(null);
      return asyncFunction(cancelInfo)
        .then((response: any) => {
          setValue(response);
          setStatus("success");
        })
        .catch((error: any) => {
          setError(error);
          setStatus("error");
        });
    },
    [asyncFunction]
  );
  // Call execute if we want to fire it right away.
  // Otherwise, execute can be called later, such as
  // in an onClick handler.
  useCancellable(
    (cancelInfo) => {
      if (immediate) {
        execute(cancelInfo).then();
      }
    },
    [execute, immediate]
  );
  return { execute, status, value, error };
}
