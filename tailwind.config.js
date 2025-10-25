module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      extend: {
                    colors: {
                        "primary": "#2563EB",
                        "accent": "#F97316",
                        "background": "#F4F7FE",
                        "background-dark": "#111827",
                        "card": "#FFFFFF",
                        "card-dark": "#1F2937",
                        "text-main": "#111827",
                        "text-main-dark": "#F9FAFB",
                        "text-secondary": "#6B7280",
                        "text-secondary-dark": "#9CA3AF",
                        "border-light": "#E5E7EB",
                        "border-dark": "#374151",
                        "deadline-red": "#FECACA",
                        "deadline-orange": "#FED7AA",
                        "deadline-yellow": "#FEF08A",
                        "task-red": "#EF4444",
                        "task-yellow": "#F59E0B",
                        "task-green": "#10B981",
                        "task-blue": "#3B82F6",
                        "modal-overlay": "rgba(0, 0, 0, 0.4)",
                        "modal-bg": "#F8FBFB",
                        "modal-border": "#E8EDED",
                        "button-save": "#2E5D59",
                        "button-save-hover": "#254a47",
                        "button-cancel": "#E8EDED",
                        "button-cancel-hover": "#dbe0e0",
                        "button-cancel-text": "#546E6C",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                },// copy or add your theme extensions here
    }
  },
  darkMode: "class",
  plugins: [],
};