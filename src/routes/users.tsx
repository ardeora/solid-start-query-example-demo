import { ErrorBoundary, Suspense } from "solid-js";
import { A, Outlet } from "solid-start";
import { Navbar } from "~/components/Navbar";
import { PageLayout } from "~/components/PageLayout";
import { Query } from "~/components/Query";

export default function Users() {
  return (
    <div class="h-screen flex flex-col">
      <Navbar />
      <Suspense>
        <Query />
      </Suspense>
    </div>
  );
}
