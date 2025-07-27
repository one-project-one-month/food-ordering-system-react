// pages/Profile/ProfileCreate.tsx
import ProfileForm from './ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../schemas/profileSchema';
import type { AppDispatch, RootState } from '../../store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function ProfileUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const profile = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    const numericId = Number(id);
    if (id && !isNaN(numericId)) {
      dispatch(getProfile(numericId)).then(() => {
        if (!profile) {
          void navigate('/403'); // Redirect if profile not found

    }
  }).catch((error: unknown) => {
        console.error('Error fetching profile:', error) 
        void navigate('/403'); // Redirect on error
      });
    }
  }, [dispatch, id, navigate, profile]);

  

  // UPDATE
 const handleUpdate = (formData: FormData) => {
  dispatch(updateProfile({ id: Number(id), formData }))
    .unwrap()
    .then(() => navigate('/'))
    .catch((err: unknown) => { console.error(err); });
};

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <ProfileForm
        onSubmit={handleUpdate}
        title={'Update'}
        defaultValues={id ? profile : undefined}
      />
    </div>
  );
}