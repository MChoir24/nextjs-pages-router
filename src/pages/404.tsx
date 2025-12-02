import Image from 'next/image';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-[#4a74d6]">
      <Image src="/404.svg" alt="404 error" width={400} height={400}/>
      <h1 className="text-5xl font-bold my-4">404 - Page Not Found</h1>
      <p className="text-xl">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}