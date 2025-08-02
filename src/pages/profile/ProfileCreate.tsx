import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addProfile, getProfile } from '../../schemas/profileSchema';
import type { AppDispatch, RootState } from '../../store';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import { toast } from 'react-toastify';

export function ProfileCreate() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { profile, loading, error } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (id) {
      void dispatch(getProfile(Number(id)));
    }
  }, [dispatch, id]);

  const handleCreate = async (formData: FormData) => {
    try {
      if (!id) throw new Error('Missing ID from URL');
        await dispatch(addProfile({ id: Number(id), formData })).unwrap();
        await navigate(`/view/${id}`);
        toast.success("profile created successfully")
    } catch (error) {
      console.error('Create failed:', error);
      toast.error("Fail to create profile")
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  if (profile && profile.id === Number(id)) {
    return null; // redirect handled in ProfileRouter
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-10">
      {error && (
        <p className="text-center text-red-500 mb-4">
          Profile not found. You can create a new one.
        </p>
      )}
      <ProfileForm
        onSubmit={handleCreate as (formData : object | FormData) =>void | Promise<void>}
        title="Create"
        defaultValues={undefined}
      />
    </div>
  );
}
