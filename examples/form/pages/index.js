import { Checkout, Layout } from '../components';
import { checkoutFields, product, store } from '../form-config';

export default function Home() {
  return (
    <Layout containerWidth="medium">
      <Checkout fields={checkoutFields} product={product} store={store} />
    </Layout>
  );
}
