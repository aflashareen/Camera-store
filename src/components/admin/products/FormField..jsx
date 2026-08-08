function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  ...props
}) {
  return (
    <div>
      <label className="mb-1 block text-sm text-zinc-400">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          className="w-full resize-none rounded-lg bg-zinc-800 p-3 outline-none"
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
          {...props}
        />
      )}
    </div>
  );
}

export default FormField;