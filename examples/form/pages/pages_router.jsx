import { Checkout } from '../components/Checkout.jsx';
import { DefaultLayout } from '../components/DefaultLayout.jsx';
import { checkoutFields, product, store } from '../form-config.js';

export default function Home() {
  return (
    <DefaultLayout containerWidth="medium">
      <Checkout fields={checkoutFields} product={product} store={store} />
    </DefaultLayout>
  );
}
