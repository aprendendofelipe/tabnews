import { DefaultLayout } from '../components/DefaultLayout.jsx';
import { Registration } from '../components/Registration.jsx';
import { registrationFields, store } from '../form-config.js';

export default function RegistrationPage() {
  return (
    <DefaultLayout containerWidth="small">
      <Registration fields={registrationFields} store={store} />
    </DefaultLayout>
  );
}
