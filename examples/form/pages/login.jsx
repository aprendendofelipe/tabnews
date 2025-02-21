import { DefaultLayout } from '../components/DefaultLayout.jsx';
import { Login } from '../components/Login.jsx';
import { loginFields, store } from '../form-config.js';

export default function LoginPage() {
  return (
    <DefaultLayout containerWidth="small">
      <Login fields={loginFields} store={store} />
    </DefaultLayout>
  );
}
