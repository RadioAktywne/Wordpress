import useData from "./useData";
import { MemberEntity } from "../data";

export default function useMembers(ids: number[]) {
  return useData<MemberEntity>(ids, "member", "member");
}
