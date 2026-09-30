import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center px-4">
      <div className="text-center">
        <p className="label text-blue-text">404</p>
        <h1 className="display mt-3 text-[clamp(4rem,14vw,8rem)]">Out of bounds</h1>
        <p className="mt-4 font-serif text-[1.25rem] text-ink-2">That page doesn&apos;t exist.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
