import { Checkout } from '../components/Checkout.jsx';
import { DefaultLayout } from '../components/DefaultLayout.jsx';
import { Head } from '../components/Head/Head.Pages.jsx';
import { checkoutFields, product, store } from '../form-config.js';

export default function Home() {
  return (
    <DefaultLayout containerWidth="medium">
      <Head description="Pages Router · Custom Description" />
      <Checkout fields={checkoutFields} product={product} store={store} />
    </DefaultLayout>
  );
}
