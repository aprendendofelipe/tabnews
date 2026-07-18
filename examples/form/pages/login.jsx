import { DefaultLayout } from '../components/DefaultLayout';
import { Login } from '../components/Login';
import { loginFields, store } from '../form-config';

export default function LoginPage() {
  return (
    <DefaultLayout containerWidth="small">
      <Login fields={loginFields} store={store} />
    </DefaultLayout>
  );
}
