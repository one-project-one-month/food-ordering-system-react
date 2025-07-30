import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addProfile, getProfile } from '../../schemas/profileSchema';
import type { AppDispatch, RootState } from '../../store';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileForm from './ProfileForm';

export function ProfileCreate() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { profile, loading, error } = useSelector((state: RootState) => state.profile);

  // Fetch profile on mount
  useEffect(() => {
    if (id) {
      void dispatch(getProfile(Number(id)));
    }
  }, [dispatch, id]);

  // Redirect if profile exists
  useEffect(() => {
    if (id && profile?.id === Number(id)) {
      void navigate(`/view/${id}`);
    }
  }, [id, profile, navigate]);

  const handleCreate = async (formData: FormData) => {
    try {
      if (!id) throw new Error('Missing ID from URL');
      await dispatch(addProfile({ id: Number(id), formData })).unwrap();
      void navigate(`/view/${id}`);
    } catch (error) {
      console.error('Create failed:', error);
      void navigate('/403');
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  // If profile exists, don't show form (redirect will happen)
  if (profile && profile.id === Number(id)) {
    return null;
  }

  // If not found, allow creating new profile
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* <h1 className="text-2xl font-semibold text-center mb-6">Create Profile</h1> */}
      {error && (
        <p className="text-center text-red-500 mb-4">
          Profile not found. You can create a new one.
        </p>
      )}
      <ProfileForm
        onSubmit={handleCreate}
        title="Create"
        defaultValues={undefined}
      />
    </div>
  );
}
