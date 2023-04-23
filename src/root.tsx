// @refresh reload
import { Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  unstable_clientOnly,
} from "solid-start";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/solid-query";
import "./root.css";
import { isServer } from "solid-js/web";

// const SolidQueryDevtools = unstable_clientOnly(
//   () => import("@adeora/solid-query-devtools")
// );

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  const client = new QueryClient();
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <QueryClientProvider client={client}>
          {/* <SolidQueryDevtools /> */}
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
        <Scripts />
      </Body>
    </Html>
  );
}
