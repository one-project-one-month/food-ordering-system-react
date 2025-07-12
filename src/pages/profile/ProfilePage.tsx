import ProfileForm from "./ProfileCreate";
import { useDispatch } from "react-redux";
import {addProfile} from "../../schemas/profileSchema";
import type { Profile } from "../../types/ProfileType";
import type { AppDispatch } from "../../store";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();

  async function handleCreateAndUpdate(data: Profile) {
    try {
      await dispatch(addProfile(data)).unwrap(); // ✅ Ensure proper error catching
      console.log("Profile added successfully!");
    } catch (error) {
      console.error("Failed to add profile:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6 py-10">
      <ProfileForm onSubmit={handleCreateAndUpdate} />
    </div>
  );
}
