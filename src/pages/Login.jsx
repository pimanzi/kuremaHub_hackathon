import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import FileInput from '../components/ui/file-input';
import DescriptionGenerator from '../components/descriptionGenerator';
import ArtPreview from '../components/ArtPreview';
import { Sparkles as LucideSparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Constants and initial data
const ART_TYPES = ['painting', 'fabric', 'photography', 'sculpture'];

const ArtUploadForm = () => {
  const [filePreview, setFilePreview] = useState('');
  const [artPreviewState, setArtPreviewState] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: '',
      type: '',
      price: '',
      colors: '',
      theme: '',
      description: '',
    },
  });

  const formData = watch();

  // Handle file upload
  const handleFileChange = (file) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
      setArtPreviewState((prevState) => ({
        ...prevState,
        file,
        filePreview: previewUrl,
      }));
    } else {
      setFilePreview('');
      setArtPreviewState((prevState) => ({
        ...prevState,
        file: null,
        filePreview: '',
      }));
    }
  };

  const handleDescriptionSelect = (description) => {
    setValue('description', description);
  };

  const onSubmit = (data) => {
    console.log('Form Submitted with Data:', data);
    reset();
  };

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          {/* File Upload */}
          <div className="space-y-3">
            <Label className="text-base">Upload Artwork</Label>
            <FileInput
              onFileChange={handleFileChange}
              previewUrl={filePreview}
            />
          </div>

          {/* Form Fields */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-base">
                Artwork Title
              </Label>
              <Input
                id="title"
                {...register('title', { required: 'Title is required' })}
                placeholder="Enter the title of your artwork"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="type" className="text-base">
                Type of Art
              </Label>
              <Select
                {...register('type', { required: 'Type is required' })}
                onValueChange={(value) => setValue('type', value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {ART_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="price" className="text-base">
                Price (RWF)
              </Label>
              <Input
                id="price"
                type="number"
                {...register('price', { required: 'Price is required' })}
                min="0"
                step="0.01"
                placeholder="Enter price in RWF"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Colors & Theme */}
          <div className="space-y-6">
            <DescriptionGenerator
              title={formData.title}
              colors={formData.colors}
              theme={formData.theme}
              onSelect={handleDescriptionSelect}
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </motion.div>

      {/* Preview */}
      <div className="sticky top-20 sm:w-[350px]">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Artwork Preview</h3>
          <p className="text-sm text-muted-foreground">
            This is how your artwork will appear in the gallery.
          </p>
        </div>
        <ArtPreview formData={artPreviewState} />
      </div>
    </div>
  );
};

export default ArtUploadForm;
