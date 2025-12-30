import { DefaultLayout } from '../components/DefaultLayout.jsx';
import { Head } from '../components/Head/Head.Pages.jsx';
import { Registration } from '../components/Registration.jsx';
import { registrationFields, store } from '../form-config.js';

export default function RegistrationPage() {
  return (
    <DefaultLayout containerWidth="small">
      <Head title="Pages Router · Custom Title" />
      <Registration fields={registrationFields} store={store} />
    </DefaultLayout>
  );
}
