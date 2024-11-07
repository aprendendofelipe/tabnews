import { Layout, Login } from '../components';
import { loginFields, store } from '../form-config';

export default function LoginPage() {
  return (
    <Layout containerWidth="small">
      <Login fields={loginFields} store={store} />
    </Layout>
  );
}
