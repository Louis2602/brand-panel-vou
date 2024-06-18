interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="h-screen p-6 flex items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
