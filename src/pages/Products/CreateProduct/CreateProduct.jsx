import React from 'react';
import Container from '../../../components/common/Container/Container';
// import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import useAxios from '../../../hooks/useAxios';

const CreateProduct = () => {
  const { user } = useAuth();
  // const axiosInstance = useAxios();
  const instance = useAxiosSecure();

  const handleCreateAProduct = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const image = e.target.image.value;
    const price_min = e.target.price_min.value;
    const price_max = e.target.price_max.value;
    console.log(title, image, price_min, price_max);

    const newProduct = {
      title,
      image,
      price_min,
      price_max,
      email: user.email,
      seller_name: user.displayName,
    };

    //   axios.post('http://localhost:3000/products', newProduct).then((data) => {
    //     console.log(data.data);
    //     if (data.data.insertedId) {
    //       Swal.fire({
    //         position: 'center',
    //         icon: 'success',
    //         title: 'Your Product has been created',
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
    //   });
    // };

    //   axiosInstance.post('/products', newProduct).then((data) => {
    //     console.log(data.data);
    //     if (data.data.insertedId) {
    //       Swal.fire({
    //         position: 'center',
    //         icon: 'success',
    //         title: 'Your Product has been created',
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
    //   });
    // };

    instance.post('/products', newProduct).then((data) => {
      // console.log(data.data);
      if (data.data.insertedId) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your Product has been created',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <Container>
        <h1>CreateProduct</h1>
        <div>
          <form onSubmit={handleCreateAProduct}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input type="text" name="title" className="input" />
              <label className="label">Image URL</label>
              <input type="text" name="image" className="input" />
              <label className="label">Min Price</label>
              <input
                type="text"
                name="price_min"
                className="input"
                placeholder="Min Price"
              />
              <label className="label">Max Price</label>
              <input
                type="text"
                name="price_max"
                className="input"
                placeholder="Max Price"
              />
              <button className="btn btn-neutral mt-4">Add a Product</button>
            </fieldset>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CreateProduct;
