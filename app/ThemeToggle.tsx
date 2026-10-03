"use client";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const explicit = document.documentElement.dataset.theme as Theme | undefined;
    const next = (explicit ?? "dark") === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("hd-theme", next);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <span aria-hidden="true">Theme</span>
      <i aria-hidden="true" />
    </button>
  );
}
