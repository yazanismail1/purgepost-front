import "./globals.css";



export const metadata = {
  title: "Purge Post",
  description: "Remove negativity from your Instagram posts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
