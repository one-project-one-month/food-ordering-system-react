// pages/Profile/ProfileCreate.tsx
import ProfileForm from './ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { addProfile, getProfile} from '../../schemas/profileSchema';
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
      void dispatch(getProfile(numericId));
    }
  }, [dispatch, id]);

  // CREATE
  const handleCreate = async (formData: FormData) => {
    try {
      // Extract required fields from FormData
      const profileData: Record<string, any> = {};
      let file: File | null = null;
      let idValue = '';

      formData.forEach((value, key) => {
        if (key === 'file' && value instanceof File) {
          file = value;
        } else if (key === 'id') {
          if (typeof value === 'string' || typeof value === 'number') {
            idValue = String(value);
          } else {
            throw new Error('Invalid id value');
          }
        } else {
          profileData[key] = value;
        }
      });

      if (!idValue || !file) {
        throw new Error('Missing required fields');
      }

      await dispatch(addProfile({
        id: idValue,
        profileData,
        file
      })).unwrap();
      console.log(profileData)
      void navigate('/');
    } catch (error) {
      console.error('Create failed:', error);
     void navigate('/403');
    }
  };

  // UPDATE
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <ProfileForm
        onSubmit={()=>handleCreate}
        title={ 'Create'}
        defaultValues={id ? profile : undefined}
      />
    </div>
  );
}