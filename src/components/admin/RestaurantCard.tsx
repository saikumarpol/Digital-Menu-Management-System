"use client";

import Link from "next/link";

interface Props {
  id: string;
  slug: string;
  name: string;
  location: string;
}

export default function RestaurantCard({ name, location, slug }: Props) {
  return (
    <Link
      href={`/admin/restaurants/${slug}`}
      className="p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
    >
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{location}</p>
    </Link>
  );
}
