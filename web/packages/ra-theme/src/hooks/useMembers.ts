import { MemberEntity } from "../data";
import useData from "./useData";

export default function useMembers(ids: number[]) {
  return useData<MemberEntity>(ids, "member", "member");
}
