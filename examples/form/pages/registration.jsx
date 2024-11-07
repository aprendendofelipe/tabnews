import { Layout, Registration } from '../components/index.js';
import { registrationFields, store } from '../form-config.js';

export default function RegistrationPage() {
  return (
    <Layout containerWidth="small">
      <Registration fields={registrationFields} store={store} />
    </Layout>
  );
}
