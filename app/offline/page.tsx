export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          You&apos;re offline
        </h1>
        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          Cloud Service Mapper is installed and still available. Please reconnect to
          refresh live comparison data.
        </p>
      </div>
    </main>
  );
}
