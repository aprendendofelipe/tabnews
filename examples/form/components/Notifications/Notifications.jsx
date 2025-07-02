'use client';
import { CheckIcon, CommentIcon, NoteIcon, SquareCircleIcon, TrashIcon } from '@primer/octicons-react';
import {
  Button,
  Heading,
  NotificationList,
  NotificationMenu,
  NotificationsProvider as Provider,
  useNotifications,
} from '@tabnews/ui';
import { Link as PrimerLink } from '@tabnews/ui/primer';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getNotifications } from './mocks.js';

const labels = {
  notifications: 'Notificações',
  close: 'Fechar',
  empty: 'Não há notificações',
  loading: 'Carregando...',
  openActionsMenu: 'Abrir opções',
  getBellLabel,
};

function getBellLabel(count) {
  switch (true) {
    case count === 0:
      return 'Sem novas notificações';
    case count === 1:
      return '1 notificação não lida';
    case count > 1:
      return `${count} notificações não lidas`;
    default:
      return 'Notificações';
  }
}

export function NotificationsProvider({ children }) {
  return <Provider {...useNotificationConfig()}>{children}</Provider>;
}

export function Notifications() {
  return (
    <>
      <PageHeader />
      <NotificationList />
      <PageFooter />
    </>
  );
}

export function NotificationCenter() {
  return <NotificationMenu footer={<OverlayFooter />} />;
}

function useNotificationConfig() {
  const [notifications, setNotifications] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  async function loadMore() {
    setIsLoading(true);

    const response = await getNotifications({ cursor: notifications.length, size: 20 });

    setNotifications((prev) => sortItems([...prev, ...response.notifications]));

    setIsLoading(false);
  }

  const onDismiss = (notification) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
  };

  const markAsRead = (notification) => {
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)));
  };

  const markAsUnread = (notification) => {
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: false } : n)));
  };

  function onCloseMenu() {
    setNotifications(sortItems);
  }

  function onItemSelect(n) {
    markAsRead(n);

    if (isMenuOpen) {
      setMenuOpen(false);
      onCloseMenu();
    }

    if (n.url) {
      router.push(n.url);
    }
  }

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    isMenuOpen,
    notifications,

    getCount,
    getItemIcon,
    isItemRead,
    onCloseMenu,
    onItemSelect,
    setMenuOpen,

    labels,
    actions: [
      {
        getLabel: (item) => (item.read ? 'Marcar como não lido' : 'Marcar como lido'),
        icon: CheckIcon,
        onClick: (item) => (item.read ? markAsUnread(item) : markAsRead(item)),
      },
      {
        label: 'Descartar',
        icon: TrashIcon,
        onClick: (item) => onDismiss(item),
      },
    ],

    loadMore, // It is not a standard prop in this context, but it is used in the footer
  };
}

function sortItems(notifications) {
  return notifications.sort((a, b) => {
    if (a.read === b.read) return 0;
    if (a.read) return 1;
    return -1;
  });
}

function isItemRead(n) {
  return n.read;
}

function getCount(notifications) {
  return notifications.filter((n) => !n.read).length;
}

function PageHeader() {
  return (
    <div className="notification-header">
      <Heading as="h1">Notificações</Heading>
      <style jsx>{`
        .notification-header {
          padding-bottom: 8px;
          border-bottom: 1px solid var(--borderColor-default);
        }
      `}</style>
    </div>
  );
}

function PageFooter() {
  const { isLoading, loadMore } = useNotifications();

  if (isLoading) return null;

  return (
    <div className="notification-footer">
      <Button onClick={loadMore} variant="invisible">
        Carregar mais
      </Button>
      <style jsx>{`
        .notification-footer {
          display: flex;
          padding: 16px;
          border-top: 1px solid var(--borderColor-default);
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

function OverlayFooter() {
  const { setMenuOpen } = useNotifications();

  return (
    <div className="notification-footer">
      <PrimerLink as={NextLink} href="/notifications" onClick={() => setMenuOpen(false)}>
        Ir para Notificações
      </PrimerLink>
      <style jsx>{`
        .notification-footer {
          display: flex;
          padding: 8px;
          margin-bottom: 8px;
          border-top: 1px solid var(--borderColor-default);
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

const iconMap = {
  new_child_content: CommentIcon,
  new_root_content: NoteIcon,
  new_tabcoins: SquareCircleIcon,
};

const iconUnreadColors = {
  new_tabcoins: '#0969da',
};

function getItemIcon(item) {
  const Icon = iconMap[item.type];
  const color = getIconColor(item);
  return Icon ? <Icon color={color} /> : null;
}

function getIconColor(item) {
  return isItemRead(item) ? 'var(--fgColor-disabled)' : iconUnreadColors[item.type] || 'var(--fgColor-default)';
}
