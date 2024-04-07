import prismadb from '@/lib/prismadb';

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });

  return (
    <div className="bg-gray-200">
      <h1 className="text-4xl font-bold text-center mt-8">Welcome to {store?.name}</h1>
      <p className="text-center mt-4">Store id: {store?.id}</p>
    </div>
  );
}

export default DashboardPage;