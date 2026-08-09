export function validateProduct(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Product name is required";
  }

  if (!formData.brand.trim()) {
    errors.brand = "Brand is required";
  }

  if (!formData.category.trim()) {
    errors.category = "Category is required";
  }

  if (!formData.price || Number(formData.price) <= 0) {
    errors.price = "Price must be greater than 0";
  }

  if (!formData.stock || Number(formData.stock) < 0) {
    errors.stock = "Stock cannot be negative";
  }

  if (!formData.image.trim()) {
    errors.image = "Image URL is required";
  }

  if (
    formData.rating === "" ||
    Number(formData.rating) < 0 ||
    Number(formData.rating) > 5
  ) {
    errors.rating = "Rating must be between 0 and 5";
  }

  if (!formData.description.trim()) {
    errors.description = "Description is required";
  }

  return errors;
}