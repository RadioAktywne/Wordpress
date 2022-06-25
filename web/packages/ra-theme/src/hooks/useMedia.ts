import { AttachmentEntity } from "@frontity/source/types";
import useData from "./useData";

export default function useMedia(ids: number[]) {
  return useData<AttachmentEntity>(ids, "media", "attachment");
}
