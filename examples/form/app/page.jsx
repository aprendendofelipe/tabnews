import { Checkout } from '../components/Checkout';
import { checkoutFields, product, store } from '../form-config';

export default function Home() {
  return <Checkout fields={checkoutFields} product={product} store={store} />;
}
