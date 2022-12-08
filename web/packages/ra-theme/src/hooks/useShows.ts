import { ShowEntity } from "../data";
import useData from "./useData";

export default function useShows(ids: number[]) {
  return useData<ShowEntity>(ids, "show", "show");
}
