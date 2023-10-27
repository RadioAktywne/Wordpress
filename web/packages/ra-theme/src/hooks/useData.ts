import { useConnect } from "frontity";
import React from "react";
import { Packages } from "../../types";
import populate from "../lib/populate";
import useAsync from "./useAsync";

export default function useData<T>(
  ids: number[],
  endpoint: string,
  property: string,
) {
  const { state, libraries } = useConnect<Packages>();
  // @ts-ignore
  const { api } = libraries.source;

  const fetch = React.useCallback(
    async ({ cancelled }) => {
      const response = await api.get({
        endpoint: endpoint,
        params: { include: ids, _embed: true },
      });
      if (cancelled) return;
      await populate({ response, state });
    },
    [endpoint, JSON.stringify(ids)],
  );

  const { status, error } = useAsync(fetch);

  return {
    status,
    error,
    value: ids.map((id) => state.source[property]?.[id] as T),
  };
}
