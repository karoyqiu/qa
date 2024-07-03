import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Books'
};

export default async function Page() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <h1>Books</h1>
    </div>
  );
}
