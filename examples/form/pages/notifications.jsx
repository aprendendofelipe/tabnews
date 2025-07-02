import { DefaultLayout } from '../components/DefaultLayout.jsx';
import { Notifications } from '../components/Notifications';

export default function NotificationsPage() {
  return (
    <DefaultLayout containerWidth="medium">
      <Notifications />
    </DefaultLayout>
  );
}
