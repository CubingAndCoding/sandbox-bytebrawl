import { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Sandbox from "./sandbox";

export default function RoomSelector({ userId }: { userId: string }) {
  const [roomId, setRoomId] = useState<string>("");
  const [joinedRoom, setJoinedRoom] = useState<string | null>(null);

  // Generate a random room ID
  const createRoom = async () => {
    const newRoomId = "room-" + Math.random().toString(36).substring(2, 8);
    try {
      await supabase.from("live_code_rooms").insert({ room_id: newRoomId });
      setJoinedRoom(newRoomId);
    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  // Join existing room
  const joinRoom = async () => {
    if (!roomId) return;
    try {
      const { data } = await supabase.from("live_code_rooms").select("*").eq("room_id", roomId).single();
      if (data) {
        setJoinedRoom(roomId);
      } else {
        alert("Room not found!");
      }
    } catch (err) {
      console.error("Error joining room:", err);
    }
  };

  if (joinedRoom) {
    return <Sandbox roomId={joinedRoom} userId={userId} />;
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Join or Create 1v1 Coding Room</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={joinRoom} className="px-4 py-2 bg-gray-200 rounded">Join Room</button>
      </div>

      <hr className="my-4" />

      <button onClick={createRoom} className="px-4 py-2 bg-blue-400 text-white rounded">
        Create New Room
      </button>
    </div>
  );
}