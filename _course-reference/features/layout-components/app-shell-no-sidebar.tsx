// WHERE TO PUT THIS IN YOUR TEST PROJECT:
// src/App.tsx
//
// USE THIS FOR MOST A3 QUESTIONS.
// It gives you header, main content, and footer without a sidebar.
//
// HOW IT LINKS TO OTHER FILES:
// App.tsx imports layout components and arranges the page.
// MainContent.tsx handles the two-column form/result area.

// import Header from "./components/Header";
// import MainContent from "./components/MainContent";
// import Footer from "./components/Footer";

function Header() {
  return (
    <header className="bg-blue-700 px-6 py-5 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h1 className="text-2xl font-bold">RMIT City Events</h1>
        <nav className="flex gap-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Bookings</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function MainContent() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded border bg-white p-6 shadow-sm">Left column</section>
        <section className="rounded border bg-white p-6 shadow-sm">Right column</section>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 px-6 py-4 text-white">
      <div className="mx-auto flex max-w-6xl justify-between">
        <p>&copy; 2026 RMIT City Events</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

