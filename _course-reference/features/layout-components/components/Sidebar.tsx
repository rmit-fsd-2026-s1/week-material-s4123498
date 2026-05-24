import React from "react";

const Sidebar = () => {
  return (
    <aside className="bg-gray-100 p-4 w-64 min-h-screen">
      <nav>
        <ul className="space-y-2">
          <li className="hover:bg-gray-200 p-2 rounded">Dashboard</li>
          <li className="hover:bg-gray-200 p-2 rounded">Profile</li>
          <li className="hover:bg-gray-200 p-2 rounded">Settings</li>
          <li className="hover:bg-gray-200 p-2 rounded">Help</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
