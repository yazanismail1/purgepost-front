import "./globals.css";
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });



export const metadata = {
  title: "Purge Post",
  description: "Remove negativity from your Instagram posts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <Header />
        <div className="md:px-[10rem] px-[2.5rem] py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
