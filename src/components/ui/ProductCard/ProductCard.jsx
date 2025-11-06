import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
  const { _id, title, price_min, price_max, category, image, description } =
    product;

  return (
    <div className="bg-gray-100 p-5 rounded-md flex flex-col justify-between gap-5">
      <div className="space-y-3">
        <div>
          <img
            src={image}
            alt={title}
            className="h-[250px] object-center object-cover w-full rounded-md"
          />
        </div>
        <div className="space-y-1">
          <span className="badge badge-info">{category}</span>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm">{description}</p>
          <span className="text-[purple] font-medium">
            $ {price_min} - {price_max}
          </span>
        </div>
      </div>
      <div>
        <Link
          to={`/dashboard/product/details/${_id}`}
          className="btn btn-primary w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
