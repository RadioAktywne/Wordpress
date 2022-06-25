import useData from "./useData";
import { ShowEntity } from "../data";

export default function useShows(ids: number[]) {
  return useData<ShowEntity>(ids, "show", "show");
}
