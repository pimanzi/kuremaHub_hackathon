export const validateForm = (formData) => {
    const errors = {};
    // Validate file
    if (!formData.file) {
      errors.file = "Please upload an artwork image";
    }
    // Validate title
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.length > 100) {
      errors.title = "Title cannot exceed 100 characters";
    }
    // Validate art type
    if (!formData.type) {
      errors.type = "Please select an art type";
    }
    // Validate price
    if (isNaN(formData.price) || formData.price < 0) {
      errors.price = "Price must be a positive number";
    }
    // Validate colors
    if (!formData.colors.trim()) {
      errors.colors = "Please describe the primary colors";
    }
    // Validate theme
    if (!formData.theme.trim()) {
      errors.theme = "Please describe the theme or inspiration";
    }
    // Validate description
    if (!formData.description.trim()) {
      errors.description = "Please provide a description for your artwork";
    }
    return errors;
  };