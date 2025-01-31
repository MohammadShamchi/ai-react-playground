type ComponentNameProps = {
  children?: React.ReactNode;
};

const ComponentName = ({ children }: ComponentNameProps) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">ComponentName</h2>
      {children}
    </div>
  );
};

export default ComponentName;
