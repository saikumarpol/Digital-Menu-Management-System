interface Props {
  name: string;
}

export default function CategoryCard({ name }: Props) {
  return (
    <div className="p-3 bg-white rounded shadow-sm border">
      <p className="text-gray-900 font-medium">{name}</p>
    </div>
  );
}
