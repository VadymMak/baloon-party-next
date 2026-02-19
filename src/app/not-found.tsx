import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 1.5rem",
        background: "rgba(255,255,255,0.9)",
        minHeight: "50vh",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#b11c1a", marginBottom: "1rem" }}>
        404
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#555",
          marginBottom: "2rem",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Stránka nebola nájdená
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.8rem 2rem",
          background: "#b11c1a",
          color: "#fff",
          borderRadius: "50px",
          textDecoration: "none",
          fontFamily: "Arial, sans-serif",
          fontWeight: 600,
        }}
      >
        Späť na hlavnú stránku
      </Link>
    </div>
  );
}
