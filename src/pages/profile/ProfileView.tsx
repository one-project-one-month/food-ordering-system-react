/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo, useEffect } from 'react';
import { getProfile, updateProfilePic } from '../../schemas/profileSchema';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store';
import Cookies from 'js-cookie';
import { CameraIcon } from 'lucide-react';
import { clearProfile } from '../../features/profile/profileSlice';

const normalizeImageUrl = (url: string) =>
  url.replace('http://localhost:8080/files/', '').replace(/^\/+/, '') || '';

export default function ProfileView() {
  const dispatch = useDispatch<AppDispatch>();
  const id = Cookies.get('userId');
  const { profile, loading } = useSelector((state: RootState) => state.profile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const numericId = Number(id);

  useEffect(() => {
    if (id && !isNaN(numericId)) {
      dispatch(clearProfile());
      void dispatch(getProfile(numericId));
    }
  }, [dispatch, id]);

  const previewUrl = useMemo(() => {
    return selectedFile ? URL.createObjectURL(selectedFile) : null;
  }, [selectedFile]);

  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    setSelectedFile(file); // show preview immediately

    try {
      await dispatch(updateProfilePic({ id: numericId, profilePic: file })).unwrap();
      console.log('✅ Profile picture updated!');
      setSelectedFile(null);
      await dispatch(getProfile(numericId)); // ✅ Refresh profile data after update
    } catch (error) {
      console.error('Failed to update profile picture:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-green-600">User Profile</h2>

        {profile ? (
          <>
            <div className="flex flex-col ml-10 space-y-4 mt-6">
              <div className="relative w-40 h-40">
                <img
                  src={
                    previewUrl ??
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    `${normalizeImageUrl(profile.profilePic!)}?v=${Date.now()}`
                  }
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-green-500 shadow-md"
                />
                <div className="absolute bottom-0 right-0 bg-white rounded-full border border-gray-300 p-1 shadow-sm">
                  <div className="relative">
                    <CameraIcon size={30} />
                    <input
                      type="file"
                      accept="image/*"
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onChange={handleProfilePicChange}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Uploaded profile image</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="text-sm font-semibold">Name</p>
                <p>{profile.name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <p>{profile.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">NRC</p>
                <p>{profile.nrc}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Gender</p>
                <p>{profile.gender}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Date of Birth</p>
                <p>{profile.dob}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-semibold">Address</p>
                <p>{profile.address}</p>
              </div>

              <div className="mt-6 flex gap-4 sm:col-span-2">
                <Link
                  to={`/profile/edit/${id ?? ''}`}
                  className="text-gray-900 border-[#3F9A1E] border hover:bg-green-400 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="mb-4 text-gray-600">No profile found.</p>
            <Link
              to={`/profile/create/${String(id)}`}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-6 py-3"
            >
              Create Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
