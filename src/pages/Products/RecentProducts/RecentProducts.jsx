import React, { use } from 'react';
import ProductCard from '../../../components/ui/ProductCard/ProductCard';

const RecentProducts = ({ recentProductsPromise }) => {
  const recentProducts = use(recentProductsPromise);
  //   console.log(recentProducts);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-5">Recent Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="text-center py-5">
        <button className="btn btn-secondary">Show All</button>
      </div>
    </div>
  );
};

export default RecentProducts;
