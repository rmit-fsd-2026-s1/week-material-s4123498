// WHERE TO PUT THIS IN YOUR TEST PROJECT:
// src/App.tsx or src/components/Layout.tsx
//
// ONLY USE THIS IF THE QUESTION CLEARLY ASKS FOR A SIDEBAR.
// A "two-column layout" usually means form/result columns, not a sidebar.

function Header() {
  return (
    <header className="bg-blue-700 px-6 py-5 text-white">
      <h1 className="text-2xl font-bold">Dashboard App</h1>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white p-4">
      <nav className="space-y-2">
        <a href="#" className="block rounded px-3 py-2 hover:bg-gray-100">Dashboard</a>
        <a href="#" className="block rounded px-3 py-2 hover:bg-gray-100">Bookings</a>
        <a href="#" className="block rounded px-3 py-2 hover:bg-gray-100">Reports</a>
      </nav>
    </aside>
  );
}

function MainContent() {
  return (
    <main className="flex-1 p-6">
      <h2 className="mb-4 text-2xl font-bold">Main content</h2>
      <section className="rounded border bg-white p-6 shadow-sm">Page content here</section>
    </main>
  );
}

function Footer() {
  return <footer className="bg-gray-900 p-4 text-center text-white">&copy; 2026</footer>;
}

export default function AppWithSidebar() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

