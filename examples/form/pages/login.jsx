import { Layout, Login } from '../components/index.js';
import { loginFields, store } from '../form-config.js';

export default function LoginPage() {
  return (
    <Layout containerWidth="small">
      <Login fields={loginFields} store={store} />
    </Layout>
  );
}
