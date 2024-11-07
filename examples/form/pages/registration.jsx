import { Layout, Registration } from '../components';
import { registrationFields, store } from '../form-config';

export default function RegistrationPage() {
  return (
    <Layout containerWidth="small">
      <Registration fields={registrationFields} store={store} />
    </Layout>
  );
}
