import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import api from "../api/api";

export default function AllProducts() {
  const queryClient = useQueryClient();

  // ✅ Fetch all products
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data.products;
    },
  });

  // ✅ User info from Redux
  const { username, role ,password} = useSelector((s: RootState) => s.auth);
  const isSuper = role === "admin" || username === "superadmin" || password === "superadmin";

  // ✅ Delete mutation
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/products/${id}`);
      return id;
    },
    onSuccess: (id: number) => {
      queryClient.setQueryData(["products"], (old: any) =>
        old?.filter((p: any) => p.id !== id)
      );
      alert(`Product ${id} deleted`);
    },
    onError: () => alert("Delete failed"),
  });

  // ✅ Loading state
  if (isLoading) return <div className="p-4">Loading products...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Products</h2>
        <button
          onClick={() => refetch()}
          className={`px-3 py-1 rounded bg-blue-600 text-white ${
            isFetching ? "opacity-50" : ""
          }`}
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {data?.map((p: any) => (
          <div
            key={p.id}
            className="border rounded-lg shadow-sm hover:shadow-md transition p-3 relative bg-white dark:bg-gray-800"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-2">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-500 text-sm truncate">{p.description}</p>
            </div>

            {isSuper && (
              <button
                onClick={() => mutation.mutate(p.id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
