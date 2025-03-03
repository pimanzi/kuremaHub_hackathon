import { useState, useEffect } from 'react';
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
import { Save as LucideSave, Sparkles as LucideSparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCreateArt } from '@/features/arts/useCreateArt';
import supabase from '@/services/supabase';
import { insertArt } from '@/services/apiArts';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useUser from '@/features/Authentication/useUser';
import { useAuthUsers } from '@/features/Authentication/useAuthUsers';

// Types and constants moved to the component file
const ART_TYPES = ['painting', 'photography', 'sculpture', 'fabric'];
const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'ETH'];
const DEFAULT_FORM_DATA = {
  title: '',
  type: '',
  price: '',
  currency: 'USD',
  colors: '',
  theme: '',
  description: '',
};

// Validation function
const validateForm = (formData) => {
  const errors = {};

  if (!formData.file) {
    errors.file = 'Please upload an image of your artwork';
  }

  if (!formData.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!formData.type) {
    errors.type = 'Please select a type of art';
  }

  if (
    !formData.price ||
    isNaN(Number(formData.price)) ||
    Number(formData.price) < 0
  ) {
    errors.price = 'Please enter a valid price';
  }

  // Only validate if colors are provided
  if (formData.colors && !formData.colors.trim()) {
    errors.colors = 'Please describe the primary colors used';
  }

  // Only validate if theme is provided
  if (formData.theme && !formData.theme.trim()) {
    errors.theme = 'Please describe the theme or inspiration';
  }

  if (!formData.description.trim()) {
    errors.description = 'Please provide a description of your artwork';
  }

  return errors;
};

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const ArtUploadForm = () => {
  const { user } = useUser();
  const id = user.id;
  const { authUsers, isLoading } = useAuthUsers();
  const [formData, setFormData] = useState({
    ...DEFAULT_FORM_DATA,
    file: null,
    filePreview: '',
    selectedDescription: '',
    description: '', // Added a dedicated description field
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showAiGenerator, setShowAiGenerator] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      if (formData.filePreview) {
        URL.revokeObjectURL(formData.filePreview);
      }
    };
  }, [formData.filePreview]);
  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        {' '}
        <div className="loader"></div>
      </div>
    );
  const realId = authUsers.filter((auth) => auth.authUserId === id)[0].id;

  // Handle file upload
  const handleFileChange = (file) => {
    if (file) {
      // Create a temporary URL for the file preview
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, file, filePreview: previewUrl });

      // Clear error if it exists
      if (errors.file) {
        setErrors({ ...errors, file: '' });
      }
    } else {
      // Clear file and preview if null is passed
      setFormData({ ...formData, file: null, filePreview: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleDescriptionSelect = (description) => {
    setFormData({
      ...formData,
      selectedDescription: description,
      description: description,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      name: formData.title,
      description: formData.description,
      price: formData.price,
      category: formData.type.toLowerCase(),
      image: formData?.file,
      userId: realId,
    };

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await insertArt(obj);
      toast.success('New art created successfully');
      navigate(-1);
    } catch (error) {
      toast.error(error);
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  // Clean up object URLs on unmount

  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label className="text-base">Upload Artwork</Label>
            <FileInput
              onFileChange={handleFileChange}
              previewUrl={formData.filePreview}
              error={errors.file}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-base">
                Artwork Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter the title of your artwork"
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="type" className="text-base">
                Type of Art
              </Label>
              <Select
                name="type"
                value={formData.type}
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger
                  id="type"
                  className={errors.type ? 'border-destructive' : ''}
                >
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
                <p className="text-xs text-destructive">{errors.type}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="price" className="text-base">
                Price
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className={errors.price ? 'border-destructive' : ''}
                />
                <Select
                  name="currency"
                  value={formData.currency}
                  onValueChange={(value) =>
                    handleSelectChange('currency', value)
                  }
                >
                  <SelectTrigger id="currency" className="w-[100px]">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.price && (
                <p className="text-xs text-destructive">{errors.price}</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="colors" className="text-base">
                Primary Colors
              </Label>
              <Input
                id="colors"
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                placeholder="Describe the primary colors used (e.g., deep blues, vibrant reds)"
                className={errors.colors ? 'border-destructive' : ''}
              />
              {errors.colors && (
                <p className="text-xs text-destructive">{errors.colors}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="theme" className="text-base">
                Theme & Inspiration
              </Label>
              <Textarea
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                placeholder="Describe the theme or inspiration behind your artwork"
                className={cn(
                  'min-h-[100px] resize-none',
                  errors.theme ? 'border-destructive' : ''
                )}
              />
              {errors.theme && (
                <p className="text-xs text-destructive">{errors.theme}</p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="description" className="text-base">
                  Artwork Description
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs flex items-center gap-1 h-7 px-2 ml-2"
                  onClick={() => setShowAiGenerator(!showAiGenerator)}
                  title={
                    showAiGenerator
                      ? 'Hide AI Description Generator'
                      : 'Get help from AI'
                  }
                >
                  <LucideSparkles className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline-block">
                    {showAiGenerator ? 'Hide AI Helper' : 'AI Helper'}
                  </span>
                </Button>
              </div>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write a detailed description of your artwork"
                className={cn(
                  'min-h-[150px]',
                  errors.description ? 'border-destructive' : ''
                )}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>
          </div>

          {showAiGenerator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-5 border border-muted rounded-lg bg-muted/30">
                <DescriptionGenerator
                  title={formData.title}
                  colors={formData.colors}
                  theme={formData.theme}
                  onSelect={handleDescriptionSelect}
                />
              </div>
            </motion.div>
          )}

          <Button
            type="submit"
            className="w-full text-white"
            disabled={submitting || !formData.file || !formData.description}
          >
            {submitting ? (
              <>
                <LucideSave className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Artwork'
            )}
          </Button>
        </form>
      </motion.div>

      <div className="sticky top-20 sm:w-[350px]">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Artwork Preview</h3>
          <p className="text-sm text-muted-foreground">
            This is how your artwork will appear in the gallery.
          </p>
        </div>
        <ArtPreview formData={formData} />
      </div>
    </div>
  );
};

export default ArtUploadForm;
