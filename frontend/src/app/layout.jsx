import "./globals.css";

export const metadata = {
  title: "Resume Builder — ATS Friendly LaTeX Resume",
  description:
    "Create professional ATS-friendly LaTeX resumes with AI-powered content enhancement. Generate and export to Overleaf instantly.",
  keywords: "resume builder, ATS, LaTeX, AI resume, Overleaf, professional resume",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
