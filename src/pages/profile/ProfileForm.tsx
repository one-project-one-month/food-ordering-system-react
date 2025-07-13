import { useForm } from 'react-hook-form';
import type { Profile } from '../../types/ProfileType';
import { useNavigate } from 'react-router-dom';

type ProfileFormProps = {
  defaultValues?: Profile | null;
  onSubmit: (formData: FormData) => void;
  title: string;
};

export default function ProfileForm({ defaultValues, onSubmit, title }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Profile>({
    defaultValues: defaultValues ?? undefined,
  });
  const navigate = useNavigate();

  const profilePicFile = watch('profilePic') as FileList | unknown;

  const onFormSubmit = (data: Profile) => {
    const formData = new FormData();
    for (const key in data) {
      if (key !== 'profilePic') {
        formData.append(key, data[key as keyof Profile] as string);
      }
    }

    if (profilePicFile?.[0]) {
      formData.append('profilePic', profilePicFile[0]);
    }

    onSubmit(formData);
    navigate('/');
  };

  const fields: { label: string; name: keyof Profile; type: string; required?: boolean }[] = [
    { label: 'User ID', name: 'userId', type: 'number', required: true },
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'NRC', name: 'nrc', type: 'text', required: true },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Phone', name: 'phone', type: 'tel', required: true },
    { label: 'Date of Birth', name: 'dob', type: 'date', required: true },
    { label: 'Count', name: 'count', type: 'number', required: true },
  ];

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      encType="multipart/form-data"
      className="w-full max-w-4xl bg-white text-black rounded-2xl shadow-xl p-10 md:p-12 space-y-10 border border-gray-300 transition"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-400">{title} Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fields.map(({ label, name, type, required }) => (
          <div key={name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">{label}</label>
            <input
              type={type}
              {...register(name, required ? { required: `Pls Enter Your ${label}` } : {})}
              className="px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[name] && (
              <span className="text-red-500 text-sm mt-1">{errors[name]?.message}</span>
            )}
          </div>
        ))}

        {/* Profile Picture: Show only when NOT updating */}
        {title !== 'Update' && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              {...register('profilePic')}
              className="px-2 py-1 border rounded-md"
            />
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2">Gender</label>
          <select
            {...register('gender', { required: 'Pls Select Your Gender' })}
            className="px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-sm mt-1">{errors.gender.message}</span>
          )}
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2">Address</label>
          <textarea
            {...register('address', { required: 'Pls Enter Your Address' })}
            rows={4}
            className="px-4 py-2 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && (
            <span className="text-red-500 text-sm mt-1">{errors.address.message}</span>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          className="px-6 py-3 bg-white-400 text-gray-400 font-medium rounded-lg hover:bg-green-400 hover:text-white transition"
        >
          {title} Profile
        </button>
      </div>
    </form>
  );
}
