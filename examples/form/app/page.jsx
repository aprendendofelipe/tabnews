import { Checkout } from '../components/Checkout.jsx';
import { checkoutFields, product, store } from '../form-config.js';

export default function Home() {
  return <Checkout fields={checkoutFields} product={product} store={store} />;
}
