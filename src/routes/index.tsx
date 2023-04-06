import { ErrorBoundary } from "solid-js";
import { A, Outlet } from "solid-start";
import { PageLayout } from "~/components/PageLayout";

export default function Home() {
  return (
    <div class="h-screen flex flex-col">
      <header class="h-12 border-b px-4 flex items-center justify-between">
        <A href="/" class="flex items-center gap-2">
          <img class="h-3" src="/logo-wordmark.svg" alt="Solid Logo" />
          <span class="font-medium text-[#58595B]">+</span>
          <span class="font-bold text-[#58595B]">TANSTACK Query</span>
        </A>
        <nav class="font-medium text-gray-600 flex items-center gap-4">
          <A class="hover:underline" href="/">
            Home
          </A>
          <A class="hover:underline" href="/users">
            Users
          </A>
        </nav>
      </header>
      <div class="flex-1 flex items-center justify-center">
        <h1 class="text-3xl font-semibold">SolidStart Example</h1>
      </div>
    </div>
  );
}
