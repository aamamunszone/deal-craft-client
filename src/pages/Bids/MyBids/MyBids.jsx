import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import Container from '../../../components/common/Container/Container';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyBids = () => {
  const { user } = useContext(AuthContext);

  const instance = useAxiosSecure();

  const [myBids, setMyBids] = useState([]);

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`https://deal-craft-server-theta.vercel.app/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // console.log('Data after getting My Bids : ', data);
  //         setMyBids(data);
  //       });
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`https://deal-craft-server-theta.vercel.app/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // console.log('Data after getting My Bids : ', data);
  //         setMyBids(data);
  //       });
  //   }
  // }, [user]);

  useEffect(() => {
    instance.get(`/bids?email=${user.email}`).then((data) => {
      setMyBids(data.data);
    });
  }, [instance, user]);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://deal-craft-server-theta.vercel.app/bids/${_id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log('Data after bids delete : ', data);
            if (data.deletedCount) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your bid has been deleted.',
                icon: 'success',
              });

              const remainingBids = myBids.filter((bid) => bid._id !== _id);
              setMyBids(remainingBids);
            }
          });
      }
    });
  };

  return (
    <div>
      <Container>
        <div>
          <h1>MyBids : {myBids.length}</h1>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Product</th>
                  <th>Seller</th>
                  <th>Bid Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {/* body */}
              <tbody>
                {myBids.map((bid, index) => (
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
                    <td>
                      <div className="badge badge-accent">{bid.status}</div>
                    </td>
                    <th>
                      <button
                        onClick={() => handleDeleteBid(bid._id)}
                        className="btn btn-outline btn-xs"
                      >
                        Remove Bid
                      </button>
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

export default MyBids;
