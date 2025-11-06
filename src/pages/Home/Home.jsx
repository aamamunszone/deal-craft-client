import React, { Suspense } from 'react';
import Container from '../../components/common/Container/Container';
import RecentProducts from '../Products/RecentProducts/RecentProducts';
import Loader from '../../components/common/Loader/Loader';

const recentProductsPromise = fetch(
  'http://localhost:3000/products/recent'
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      {/* Recent Products Section */}
      <section>
        <Container>
          <Suspense fallback={<Loader />}>
            <RecentProducts recentProductsPromise={recentProductsPromise} />
          </Suspense>
        </Container>
      </section>
    </div>
  );
};

export default Home;
