import { DefaultLayout } from '../components/DefaultLayout';
import { Head } from '../components/Head/Head.Pages';
import { Registration } from '../components/Registration';
import { registrationFields, store } from '../form-config';

export default function RegistrationPage() {
  return (
    <DefaultLayout containerWidth="small">
      <Head title="Pages Router · Custom Title" />
      <Registration fields={registrationFields} store={store} />
    </DefaultLayout>
  );
}
