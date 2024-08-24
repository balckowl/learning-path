import Footer from "./components/layout/footer";
import Header from "./components/layout/header";

export default function Home() {
  return (
    <main>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="grow">てすと</div>
        <Footer />
      </div>
    </main>
  );
}
