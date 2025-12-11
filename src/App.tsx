import RoomSelector from "./RoomSelector";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const userId = "user-" + Math.random().toString(36).substring(2, 8); 

  return <RoomSelector userId={userId} />;
}