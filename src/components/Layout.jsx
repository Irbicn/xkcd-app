import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }){
  return (
    <>
      <Header />
      <main  className="text-center max-w-lg m-auto">
        { children }
      </main>
      <Footer />
    </>
  )
}
