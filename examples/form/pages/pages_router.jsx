import { Checkout } from '../components/Checkout';
import { DefaultLayout } from '../components/DefaultLayout';
import { Head } from '../components/Head/Head.Pages';
import { checkoutFields, product, store } from '../form-config';

export default function Home() {
  return (
    <DefaultLayout containerWidth="medium">
      <Head description="Pages Router · Custom Description" />
      <Checkout fields={checkoutFields} product={product} store={store} />
    </DefaultLayout>
  );
}
