import FormField from "./FormField.";

function ProductForm({
  formData,
  errors,
  onChange,
  onSubmit,
  isLoading,
  buttonText = "Add Product",
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">

      <FormField
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Enter product name"
        error={errors?.name}
      />

      <FormField
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={onChange}
        placeholder="Enter brand"
        error={errors?.brand}
      />

      <FormField
        label="Category"
        name="category"
        value={formData.category}
        onChange={onChange}
        placeholder="Enter category"
        error={errors?.category}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={onChange}
          placeholder="₹ Price"
          error={errors?.price}
        />

        <FormField
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={onChange}
          placeholder="Stock"
          error={errors?.stock}
        />
      </div>

      <FormField
        label="Image URL"
        name="image"
        value={formData.image}
        onChange={onChange}
        placeholder="Enter image URL"
        error={errors?.image}
      />

      <FormField
        label="Rating"
        name="rating"
        type="number"
        value={formData.rating}
        onChange={onChange}
        placeholder="Rating"
        min="0"
        max="5"
        step="0.1"
        error={errors?.rating}
      />

      <FormField
        label="Description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={onChange}
        placeholder="Enter description"
        error={errors?.description}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-white py-3 text-black disabled:opacity-50"
      >
        {isLoading ? "Saving..." : buttonText}
      </button>

    </form>
  );
}

export default ProductForm;