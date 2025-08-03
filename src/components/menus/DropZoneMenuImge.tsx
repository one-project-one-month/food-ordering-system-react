import Dropzone from 'react-dropzone';
import { CameraIcon } from 'lucide-react';

interface DropZoneMenuImageProps {
  setDropDrown: (files: File[]) => void;
}

export default function DropZoneMenuImage({ setDropDrown }: DropZoneMenuImageProps) {
  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        setDropDrown(acceptedFiles);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section className='w-[80%]'>
          <div
            {...getRootProps()}
            className="h-28 w-full flex justify-center items-center text-center mt-4 border-dashed border-[4px]"
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <CameraIcon className="mx-auto" />
              <p className="text-sm">Upload photo.</p>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
