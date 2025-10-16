import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const CATEGORY = "smartphones";

export default function Category() {
  const { data, refetch } = useQuery<any[], Error>({
    queryKey: ["category", CATEGORY],
    queryFn: async () => {
      const res = await api.get(`/products/category/${CATEGORY}`);
      return res.data.products;
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Category: {CATEGORY}</h2>
      <button onClick={() => refetch()} className="mb-4 bg-gray-200 px-2 py-1 rounded">
        Refresh
      </button>
      <div className="grid grid-cols-2 gap-4">
        {data?.map((p: any) => (
          <div key={p.id} className="border rounded p-2">
            <img src={p.thumbnail} className="w-full h-40 object-cover rounded" />
            <p className="mt-2 font-semibold">{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
