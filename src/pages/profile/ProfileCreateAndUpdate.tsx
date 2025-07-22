// pages/Profile/ProfileCreate.tsx
import ProfileForm from './ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { addProfile, getProfile, updateProfile, updateProfilePic } from '../../schemas/profileSchema';
import type { AppDispatch, RootState } from '../../store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function ProfileCreate() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const profile = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    const numericId = Number(id);
    if (id && !isNaN(numericId)) {
      dispatch(getProfile(numericId));
    }
  }, [dispatch, id]);

  // CREATE
  const handleCreate = async (formData: FormData) => {
    try {
      await dispatch(addProfile(formData)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Create failed:', error);
      navigate('/403');
    }
  };

  // UPDATE
 const handleUpdate = (formData: FormData) => {
  dispatch(updateProfile({ id: Number(id), formData }))
    .unwrap()
    .then(() => navigate('/'))
    .catch((err) => console.error(err));
};

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <ProfileForm
        onSubmit={id ? handleUpdate : handleCreate}
        title={id ? 'Update' : 'Create'}
        defaultValues={id ? profile : undefined}
      />
    </div>
  );
}
