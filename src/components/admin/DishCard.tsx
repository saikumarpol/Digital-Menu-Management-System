interface Props {
  name: string;
  imageUrl?: string | null;
  description?: string | null;
  spiceLevel?: string | null;
}

export default function DishCard({ name, imageUrl, description, spiceLevel }: Props) {
  return (
    <div className="p-4 bg-white rounded shadow flex gap-4 border">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-24 h-24 object-cover rounded"
        />
      )}

      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        {description && <p className="text-gray-600">{description}</p>}
        {spiceLevel && <span className="text-sm">🌶 {spiceLevel}</span>}
      </div>
    </div>
  );
}
