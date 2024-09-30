import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between gap-10 items-center">
        {/* Hero Content */}
        <div className="md:max-w-[50%]">
          <h1 className="md:text-4xl text-3xl font-bold mb-2 md:text-left text-center">
            Clean up your <span className="underline md:text-5xl text-4xl">Instagram comments</span> with one click!
          </h1>
          <p className="text-lg text-gray-500 mb-6 md:text-justify text-center">
            Automatically detect and remove negative comments from your posts with the help of AI. Let PurgePost keep your feed positive and engaging!
          </p>
          <a href="/signup" className="block w-full text-center py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-hover transition duration-300">
            Request early access
          </a>
        </div>

        {/* Hero Image */}
        <div className="justify-self-center">
          {/* <img src="/hero/relax.jpg" alt="Clean Feed Illustration"  className="w-full rounded-3xl" /> */}
          <Image src="/hero/15K.svg" alt="Clean Feed Illustration"  className="rounded-3xl" width={315} height={500} />
        </div>

      </section>
    </div>
  );
}
