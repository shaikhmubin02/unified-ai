import Footer from "./components/Footer"
import Header from "./components/Header"
import { useTheme } from "next-themes";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}