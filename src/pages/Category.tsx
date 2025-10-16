// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import api from "../api/api";

// const CATEGORY = "smartphones";

// export default function Category() {
//   const { data, refetch } = useQuery<any[], Error>({
//     queryKey: ["category", CATEGORY],
//     queryFn: async () => {
//       const res = await api.get(`/products/category/${CATEGORY}`);
//       return res.data.products;
//     },
//   });

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">Category: {CATEGORY}</h2>
//       <button onClick={() => refetch()} className="mb-4 bg-gray-200 px-2 py-1 rounded">
//         Refresh
//       </button>
//       <div className="grid grid-cols-2 gap-4">
//         {data?.map((p: any) => (
//           <div key={p.id} className="border rounded p-2">
//             <img src={p.thumbnail} className="w-full h-40 object-cover rounded" />
//             <p className="mt-2 font-semibold">{p.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchByCategory } from '../Api/api';

export default function Category({ category = 'smartphones' }: { category?: string }) {
  const { data, refetch, isFetching } = useQuery<{ products: any[] }, Error>({
    queryKey: ['category', category],
    queryFn: () => fetchByCategory(category),
  });

  return (
    <div className="p-4 min-h-[80vh] sm:min-h-[90vh] lg:min-h-[85vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Category: {category}</h2>
        <button onClick={() => refetch()} className="px-2 py-1 bg-gray-200 rounded">
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data?.products.map((p: any) => (
          <div key={p.id} className="border rounded p-2">
            <img src={p.thumbnail} className="w-full h-40 object-cover rounded" alt={p.title} />
            <p className="mt-2 font-semibold">{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
