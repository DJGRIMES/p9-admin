import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Dashboard", exact: true },
    { to: "/founts", label: "Founts" },
    { to: "/invites", label: "Invites" },
    { to: "/receipts", label: "Receipts" }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <aside
        style={{
          width: "220px",
          padding: "1rem",
          borderRight: "1px solid #ddd",
          background: "#fafafa"
        }}
      >
        <h1 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>P9 Admin</h1>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {navItems.map((item) => {
            const active =
              item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  textDecoration: "none",
                  color: active ? "#000" : "#555",
                  fontWeight: active ? 600 : 400
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "1.5rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
// Sidebar and topbar layout shell placeholder.
