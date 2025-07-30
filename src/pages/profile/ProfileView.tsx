import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {  getProfile, updateProfilePic } from '../../schemas/profileSchema';
import { Link,useParams } from 'react-router-dom';
import { clearUpdateSuccess, clearProfile } from '../../features/profile/profileSlice';
import type { AppDispatch, RootState } from '../../store';

const getValidImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://localhost:8080/files/https:/')) {
    return url.replace('http://localhost:8080/files/', '').replace(/^\/+/, '');
  }
  if (url.startsWith('http://localhost:8080/files/')) {
    return url.replace('http://localhost:8080/files/', '');
  }
  return url;
};

export default function ProfileView() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { profile, loading,  updateSuccess } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (id) {
      const numericId = Number(id);
      if (!isNaN(numericId)) {
        void dispatch(getProfile(numericId));
        dispatch(clearUpdateSuccess());
      }
    }

    return () => {
      dispatch(clearProfile()); // Clear profile state on unmount
    };
  }, [dispatch, id, updateSuccess]);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;
    void dispatch(updateProfilePic({ id: Number(id), profilePic: file }));
  };

  // const handleDelete = async () => {
  //   if (!id) return;
  //   const confirmed = window.confirm('Are you sure you want to delete this profile?');
  //   if (!confirmed) return;

  //   try {
  //     await dispatch(deleteProfile({ id: Number(id) })).unwrap();
  //     void navigate('/');
  //   } catch (error) {
  //     console.error('Delete failed:', error);
  //   }
  // };

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
            {profile.profilePic && (
              <div className="flex flex-col ml-10 space-y-4 mt-6">
                <div className="relative w-40 h-40">
                  <img
                    src={getValidImageUrl(profile.profilePic)}
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
                {/* Uncomment to enable Delete Profile button */}
                {/* <button
                  onClick={handleDelete}
                  className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Delete Profile
                </button> */}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="mb-4 text-gray-600">No profile found.</p>
            <Link
              to={`/profile/create/${String(id)}`}    className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-6 py-3"
            >
              Create Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
