
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchProducts, deleteProduct } from "../Api/api";

export default function AllProducts() {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch, isFetching } = useQuery<{ products: any[] }, Error>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  const { username, role } = useSelector((s: RootState) => s.auth);
  const isAdmin = role === "admin" || username === "superadmin";

  const delMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: (_data, id: number) => {
      queryClient.setQueryData(["products"], (old: any) => {
        if (!old) return old;
        return { ...old, products: old.products.filter((p: any) => p.id !== id) };
      });
      alert(`Deleted product ${id}`);
    },
    onError: () => alert("Delete failed"),
  });

  if (isLoading) return <div className="p-4">Loading products...</div>;

  return (
    <div className="p-4 min-h-[80vh] sm:min-h-[90vh] lg:min-h-[85vh] ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Products</h2>
        <button
          onClick={() => refetch()}
          className={`px-3 py-1 rounded bg-blue-600 text-white ${isFetching ? "opacity-50" : ""}`}
          disabled={!!isFetching}
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {data?.products.map((p: any) => (
          <div key={p.id} className="border rounded-lg shadow-sm p-3 relative bg-white">
            <img src={p.thumbnail} alt={p.title} className="w-full h-48 object-cover rounded-md" />
            <div className="mt-2">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-500 text-sm truncate">{p.description}</p>
            </div>

            {isAdmin && (
              <button
                onClick={() => delMutation.mutate(p.id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
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
