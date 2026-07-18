import { Header } from './Header';

export function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div
        style={{
          padding: '16px 24px',
        }}>
        {children}
      </div>
    </>
  );
}
