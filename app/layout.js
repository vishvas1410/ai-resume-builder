import "./globals.css";

export const metadata = {
  title: "AI Resume Builder - ATS Optimized Resumes Powered by Gemini",
  description:
    "Build a professional, ATS-friendly resume in minutes with Google Gemini AI. Select modern, classic, or minimal templates and export to PDF instantly.",
  keywords: ["AI Resume Builder", "Gemini AI", "ATS Resume", "Resume Generator", "Next.js Resume"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
