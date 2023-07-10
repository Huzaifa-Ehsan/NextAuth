type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="flex h-screen bg-gradient-to-t from-red-400 via-indigo-300 to-cyan-200">
      <div className="w-[80%] h-[100%] sm:h-[90%] bg-[#eee] flex justify-center  m-auto rounded-lg">
        {children}
      </div>
    </div>
  );
}

export default Layout;
