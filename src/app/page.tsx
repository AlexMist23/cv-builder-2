import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">CV Builder</h1>
      <p className="text-xl mb-8">Create professional CVs with ease</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* TODO: CV design examples here */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Classic Design</h2>
          <p>A timeless and professional CV layout</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Modern Design</h2>
          <p>A sleek and contemporary CV style</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Creative Design</h2>
          <p>Stand out with a unique CV design</p>
        </div>
      </div>
      <Link href="/builder">
        <Button>Create Your CV</Button>
      </Link>
    </main>
  );
}
