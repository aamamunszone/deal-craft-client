import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import Container from '../../../components/common/Container/Container';
import { AuthContext } from '../../../contexts/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProductDetails = () => {
  const [bids, setBids] = useState([]);

  const { user } = useContext(AuthContext);

  const { _id } = useLoaderData();

  const bidModalRef = useRef(null);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();

    const formData = {
      productId: _id,
      name: e.target.name.value,
      email: e.target.email.value,
      bid: parseFloat(e.target.bid.value),
    };

    console.log(formData);

    const newBid = {
      product: formData.productId,
      buyer_name: formData.name,
      buyer_email: formData.email,
      buyer_image: user?.photoURL,
      bid_price: formData.bid,
      status: 'pending',
    };

    fetch('http://localhost:3000/bids', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('Data after bid placed : ', data);
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your bid has been placed',
            showConfirmButton: false,
            timer: 1500,
          });
          // add the new bid to the state
          newBid._id = data.insertedId;
          const allBids = [...bids, newBid];
          // for current sorting
          allBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(allBids);
        }
      });
  };

  // useEffect(() => {
  //   fetch(`http://localhost:3000/products/bids/${_id}`, {
  //     headers: {
  //       authorization: `Bearer ${user.accessToken}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log('Bids for this product : ', data);
  //       setBids(data);
  //     });
  // }, [_id, user]);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/bids/${_id}`).then((data) => {
      console.log('after axios get : ', data);
      setBids(data.data);
    });
  }, [_id]);

  return (
    <div>
      <Container className="space-y-5">
        <h1 className="text-center text-2xl font-bold py-5">Product Details</h1>
        {/* Product Info */}
        <div className="text-right">
          <button onClick={handleBidModalOpen} className="btn btn-success">
            I want to buy this product
          </button>
        </div>
        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Give the best offer!</h3>
            <p className="py-4">Offer something seller can't resist</p>
            <form onSubmit={handleBidSubmit}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  defaultValue={user.displayName}
                  readOnly
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  defaultValue={user.email}
                  readOnly
                />
                <label className="label">Bid</label>
                <input
                  type="text"
                  name="bid"
                  className="input"
                  placeholder="Your Bid"
                />
                <button className="btn btn-neutral mt-4">Place Your Bid</button>
              </fieldset>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* Bids for this product */}
        <div>
          <h3 className="text-xl font-medium">
            Bids For this product : {bids.length}
          </h3>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Bid Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {/* body */}
              <tbody>
                {bids.map((bid, index) => (
                  <tr key={bid._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={bid?.buyer_image} alt={bid.buyer_name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid.buyer_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{bid.buyer_email}</td>
                    <td>{bid.bid_price}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
