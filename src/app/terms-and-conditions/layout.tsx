// app/layout.tsx
import Navbar from "@/components/navbar/Navbar";
import React from "react";


export const metadata = {
  title: "Terms-and-conditions - vereda",
  description: "terms-and-conditions Vereda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* You can add custom meta tags or scripts here */}
      </head>
      <body >
        <Navbar/>

        <main className="">{children}</main>

       
      </body>
    </html>
  );
}
