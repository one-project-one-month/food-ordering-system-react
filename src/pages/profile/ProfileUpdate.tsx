import ProfileForm from './ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../schemas/profileSchema';
import type { AppDispatch, RootState } from '../../store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function ProfileUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const numericId = Number(id);
      if (id && !isNaN(numericId)) {
        try {
          await dispatch(getProfile(numericId)).unwrap();
          setLoading(false);
        } catch (error) {
          console.error('Error fetching profile:', error);
          void navigate('/403');
        }
      }
    };

    void fetchProfile();
  }, [dispatch, id, navigate]);

  const handleUpdate = (formData: FormData) => {
    dispatch(updateProfile({ id: Number(id), formData }))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err: unknown) => {
        console.error('Update error:', err);
      });
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <ProfileForm
        onSubmit={handleUpdate}
        title="Update"
        defaultValues={profile}
      />
    </div>
  );
}
