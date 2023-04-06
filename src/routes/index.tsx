import { ErrorBoundary } from "solid-js";
import { A, Outlet } from "solid-start";
import { Navbar } from "~/components/Navbar";
import { PageLayout } from "~/components/PageLayout";

export default function Home() {
  return (
    <div class="h-screen flex flex-col">
      <Navbar />
      <div class="flex-1 flex items-center justify-center">
        <h1 class="text-3xl font-semibold">SolidStart Example</h1>
      </div>
    </div>
  );
}
