import RoomSelector from "./RoomSelector";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const userId = "user-" + Math.random().toString(36).substring(2, 8);

  return (
    <div className="p-6 min-h-screen bg-white">
      <h1 className="text-2xl font-bold">Live Code Sandbox</h1>
      <RoomSelector userId={userId} />
    </div>
  );
}