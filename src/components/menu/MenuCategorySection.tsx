export default function MenuCategorySection({
  category,
  dishes,
}: {
  category: string;
  dishes: any[];
}) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">{category}</h2>

      <div className="space-y-3">
        {dishes.map((d) => (
          <div
            key={d.id}
            className="p-4 bg-white rounded shadow flex gap-4 border"
          >
            {d.imageUrl && (
              <img
                src={d.imageUrl}
                alt={d.name}
                className="w-24 h-24 object-cover rounded"
              />
            )}

            <div>
              <h3 className="text-lg font-semibold">{d.name}</h3>
              <p className="text-gray-600">{d.description}</p>
              {d.spiceLevel && <p className="text-sm">🌶 {d.spiceLevel}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
