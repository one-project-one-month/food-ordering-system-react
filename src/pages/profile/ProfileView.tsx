import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { useEffect } from 'react';
import { getProfile, updateProfilePic } from '../../schemas/profileSchema';
import { Link, useParams } from 'react-router-dom';

export default function ProfileView() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.profile);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const numericId = Number(id);
      if (!isNaN(numericId)) {
        dispatch(getProfile(numericId));
      }
    }
  }, [dispatch]);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    dispatch(updateProfilePic({ id: Number(id), profilePic: file }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-green-600">User Profile</h2>

        {profile?.profilePic && (
          <div className="flex flex-col ml-10 space-y-4 mt-6">
            <div className="relative w-40 h-40">
              <img
                src={
                  typeof profile.profilePic === 'string'
                    ? profile.profilePic.startsWith('data:')
                      ? profile.profilePic
                      : `data:image/jpeg;base64,${profile.profilePic}`
                    : URL.createObjectURL(profile.profilePic)
                }
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-green-500 shadow-md"
              />
              <div className="absolute bottom-0 right-0 bg-white rounded-full border border-gray-300 p-1 shadow-sm">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 3a2 2 0 00-2 2v11a2 2 0 002 2h11.586a2 2 0 001.414-.586l2-2A2 2 0 0019 14.586V5a2 2 0 00-2-2H4z" />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Uploaded profile image</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="text-sm font-semibold">Name</p>
            <p>{profile?.name}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">User ID</p>
            <p>{profile?.userId}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Email</p>
            <p>{profile?.email}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Phone</p>
            <p>{profile?.phone}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">NRC</p>
            <p>{profile?.nrc}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Gender</p>
            <p>{profile?.gender}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Date of Birth</p>
            <p>{profile?.dob}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Count</p>
            <p>{profile?.count}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm font-semibold">Address</p>
            <p>{profile?.address}</p>
          </div>
          <div>
            <Link
              to={`/profile/${profile?.id}`}
              className="text-gray-900 border-[#3F9A1E] border focus:outline-none hover:bg-green-400
               focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
