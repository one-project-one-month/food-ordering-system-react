import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Button } from '../../components/ui/button';

interface ProfileFormProps {
onSubmit: (formData: FormData | object) => void | Promise<void>;
  title: 'Create' | 'Update';
  defaultValues?: {
    name?: string;
    nrc?: string;
    phone?: string;
    dob?: string;
    gender?: 'Male' | 'Female';
    address?: string;
    profilePic?:string
  };
}

export default function ProfileForm({ onSubmit, title, defaultValues }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data: any) => {
    const { name, nrc, phone, dob, gender, address,profilePic } = data;

    if (title === 'Create') {
      const formData = new FormData();

      const jsonBlob = new Blob(
        [
          JSON.stringify({
            name,
            nrc,
            phone,
            dob,
            gender: gender.toUpperCase(),
            address,
          }),
        ],
        { type: 'application/json' }
      );

      formData.append('data', jsonBlob);

      if (profilePic?.[0]) {
        formData.append('file', profilePic[0] as string);
      }

     void onSubmit(formData);
    } else {
     void onSubmit({
        name,
        nrc,
        phone,
        dob,
        gender: gender.toUpperCase(),
        address
      });
    }
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(handleFormSubmit)}
  
      className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 space-y-4"
    >
      <h2 className="text-xl font-bold">{title} Profile</h2>

      {/* Name */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-2">Name</label>
        <input
          {...register('name', {
            required: 'Name must not be empty',
          })}
          className="px-4 py-2 text-sm w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-2">Phone</label>
        <input
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^09\d{9}$/,
              message: 'Phone number must start with 09 and be exactly 11 digits',
            },
          })}
          className="px-4 py-2 text-sm w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      {/* NRC */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-2">NRC</label>
        <input
          {...register('nrc', {
            required: 'NRC is required',
            pattern: {
             value: /^(1[0-4]|[1-9])\/[A-Za-z]+\([A-Z]\)\d{6}$/,
message: 'Invalid NRC format. Must be in the format 1-14/Word(A-Z)123456'

            },
          })}
          className="px-4 py-2 text-sm w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        {errors.nrc && <p className="text-red-600 text-sm mt-1">{errors.nrc.message}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-2">Gender</label>
        <select
          {...register('gender', {
            required: 'Gender is required',
          })}
          className="px-4 py-2 text-sm w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>}
      </div>

      {/* DOB */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
        <input
          type="date"
          {...register('dob', {
            required: 'Date of birth is required',
          })}
          className="px-4 py-2 text-sm w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        {errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob.message}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-2">Address</label>
        <textarea
          {...register('address', {
            required: 'Address is required',
          })}
          className="px-4 py-2 text-sm w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
      </div>

      {/* Profile Picture */}
      {title === 'Create' && (
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            {...register('profilePic', {
              required: 'Profile picture is required',
            })}
            className="mt-1 block w-full border-gray-300 rounded focus:ring focus:border-green-500"
          />
          {errors.profilePic && <p className="text-red-600 text-sm mt-1">{errors.profilePic.message}</p>}
        </div>
      )}

      <div className='flex justify-center pt-6'>
      <Button
        type="submit"
        className='w-[200px]'
      >
        Save
      </Button>
     </div>
    </form>
  );
}
