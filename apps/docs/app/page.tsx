import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Documentation</h1>
      <p className="mt-4 text-xl">Dona Liamba Cann Association</p>
      <div className="mt-8 grid gap-4">
        <Link href="/docs/architecture" className="text-blue-500 hover:underline">
          Architecture
        </Link>
        <Link href="/docs/api" className="text-blue-500 hover:underline">
          API Reference
        </Link>
      </div>
    </div>
  );
}
