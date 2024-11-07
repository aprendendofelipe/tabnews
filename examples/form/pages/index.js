import { Checkout, Layout } from '../components/index.js';
import { checkoutFields, product, store } from '../form-config.js';

export default function Home() {
  return (
    <Layout containerWidth="medium">
      <Checkout fields={checkoutFields} product={product} store={store} />
    </Layout>
  );
}
