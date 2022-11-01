import Footer from "./components/Footer";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-cyan-500 text-center text-white md:items-center">
      <main className="">
        <Form />
      </main>
      <Footer />
    </div>
  );
};

export default App;
