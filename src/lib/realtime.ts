import { supabase } from "./supabaseClient";

type LiveCodeFile = {
  id?: number;
  room_id: string;
  user_id: string;
  filename: string;
  code: string;
  language: string;
  output: string;
};

export const subscribeToRoomFiles = (
  roomId: string,
  userId: string,
  onUpdate: (data: LiveCodeFile) => void
) => {
  const channel = supabase
    .channel(`room-${roomId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "live_code_files",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => {
        const updatedFile = payload.new as LiveCodeFile; // cast to proper type
        if (updatedFile.user_id !== userId) {
          onUpdate(updatedFile);
        }
      }
    )
    .subscribe();

  return channel;
};