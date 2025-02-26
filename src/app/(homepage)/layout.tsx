import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MenuCategory from "@/components/MenuCategory";
import ScrollToTop from "@/components/ScroolToTop";

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
      <MenuCategory />
    </div>
  );
}
