import ProfileForm from './ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../schemas/profileSchema';
import type { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { clearProfile } from '../../features/profile/profileSlice';

export function ProfileUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const id = Cookies.get('userId');
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const numericId = Number(id);
      if (id && !isNaN(numericId)) {
        try {
          await dispatch(getProfile(numericId)).unwrap();
        } catch (error) {
          console.error('Error fetching profile:', error);
          void navigate('/403');
        } finally {
          setLoading(false);
        }
      } else {
       void navigate('/403');
      }
    };
    void fetchProfile();
  }, [dispatch, id, navigate]);

  const handleUpdate = async (formData: FormData) => {
    try {
      if (!id) throw new Error('Missing ID');
      const result = await dispatch(updateProfile({ id: Number(id), formData })).unwrap();
      dispatch(clearProfile()); // ✅ clears stale state
      if (result) {
       void navigate(`/view/${id}`);
      }
    } catch (err) {
      console.error('Update error:', err);
      void navigate('/403');
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-10">
      <ProfileForm onSubmit={handleUpdate as (formData: object | FormData) => void | Promise<void>} title="Update" defaultValues={profile as any} />
    </div>
  );
}
