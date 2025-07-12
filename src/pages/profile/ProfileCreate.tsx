import ProfileForm from "./ProfileForm";
import { useDispatch } from "react-redux";
import {addProfile} from "../../schemas/profileSchema";
import type { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";

export function ProfileCreate() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate()

  async function handleCreateAndUpdate(formData: FormData) {
  try {
    await dispatch(addProfile(formData)).unwrap();
    console.log("Profile added successfully!");
    navigate("/");
  } catch (error) {
    console.error("Failed to add profile:", error);
    navigate("/403");
  }
}


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6 py-10">
      <ProfileForm onSubmit={handleCreateAndUpdate} />
    </div>
  );
}
