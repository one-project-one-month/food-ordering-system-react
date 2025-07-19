import ProfileForm from './ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { addProfile, getProfile, updateProfile } from '../../schemas/profileSchema';
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

  const handleCreate = async (formData: FormData) => {
    try {
      await dispatch(addProfile(formData)).unwrap();
      navigate('/');
    } catch {
      navigate('/403');
    }
  };

  const handleUpdate = async (formData: FormData) => {
    const numericId = Number(id);
    if (!id || isNaN(numericId)) {
      navigate('/403'); // ဒါမှ မမှန်တဲ့ ID ကို handle လုပ်ပေးနိုင်တယ်
      return null;
    }
    if (!isNaN(numericId)) {
      try {
        await dispatch(updateProfile({ id: numericId, formData })).unwrap();
        console.log(formData.forEach)
        navigate('/profile');
      } catch {
        navigate('/403');
      }
    }
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
