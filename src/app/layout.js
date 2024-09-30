import Header from "@/components/Header";
import "./globals.css";



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
