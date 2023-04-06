import { A, Outlet, useParams } from "solid-start";
import { createQuery } from "@tanstack/solid-query";
import { For, Match, Show, Suspense, Switch, createSignal } from "solid-js";
import {
  API_URL,
  IUser,
  IUserDetails,
  convertDateToString,
  sleep,
} from "../../utils";

export default function UserProfile() {
  const params = useParams();

  const userQuery = createQuery(() => ({
    queryKey: ["users", params.id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/users/${params.id}`).then(
        (res) => res.json()
      );
      return response as IUser;
    },
    placeholderData: (prev) => prev,
  }));

  const userDetailsQuery = createQuery(() => ({
    queryKey: ["user_details", params.id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/user_details/${params.id}`).then(
        (res) => res.json()
      );
      return response as IUserDetails;
    },
    placeholderData: (prev) => prev,
  }));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div class="flex-1 overflow-y-auto">
        <Show when={userQuery.data && userDetailsQuery.data}>
          <section class="relative">
            <div class="relative h-56 overflow-hidden">
              <Show when={userQuery.data}>
                <div class="relative w-[120%] h-56 left-1/2 -translate-x-1/2">
                  <img
                    class="absolute h-full w-full object-cover opacity-70"
                    src={`https://source.boringavatars.com/marble/120/${
                      userQuery.data!.username
                    }?colors=541e35,df5d2e,ffb43e,a4c972,6bb38e`}
                    alt="User cover"
                  />
                </div>
              </Show>
            </div>
            <div class="absolute h-48 w-48 bottom-[5%] left-12 translate-y-1/2 rounded-full overflow-hidden border-[12px] shadow-lg border-white">
              <Show when={userQuery.data}>
                <img
                  class="absolute h-full w-full object-cover"
                  src={`https://source.boringavatars.com/marble/120/${
                    userQuery.data!.username
                  }?colors=541e35,df5d2e,ffb43e,a4c972,6bb38e`}
                  alt="User cover"
                />
                <img
                  class="absolute h-full w-full bottom-0 left-1/2 -translate-x-1/2 z-10"
                  src={userQuery.data!.avatar}
                  alt={`${userQuery.data!.firstName} ${
                    userQuery.data!.lastName
                  }`}
                />
              </Show>
            </div>
          </section>
          <section class="">
            <div class="container max-w-5xl py-6">
              <div class="ml-72 pr-8">
                <h1 class="font-bold text-gray-900 text-4xl">
                  {userQuery.data!.firstName} {userQuery.data!.lastName}
                </h1>
                <Switch>
                  <Match when={userDetailsQuery.data!.status === "active"}>
                    <p class="text-green-600 py-1.5 rounded-full px-6 mt-4 inline-block bg-green-100">
                      <span class="font-semibold">Active</span>
                    </p>
                  </Match>
                  <Match when={userDetailsQuery.data!.status === "subscribed"}>
                    <p class="text-blue-600 py-1.5 rounded-full px-6 mt-4 inline-block bg-blue-100">
                      <span class="font-semibold">Subscribed</span>
                    </p>
                  </Match>
                  <Match when={userDetailsQuery.data!.status === "inactive"}>
                    <p class="text-gray-600 py-1.5 rounded-full px-6 mt-4 inline-block bg-gray-100">
                      <span class="font-semibold">Inactive</span>
                    </p>
                  </Match>
                  <Match when={userDetailsQuery.data!.status === "deactivated"}>
                    <p class="text-red-600 py-1.5 rounded-full px-6 mt-4 inline-block bg-red-100">
                      <span class="font-semibold">Deactivated</span>
                    </p>
                  </Match>
                </Switch>
                <p class="text-gray-500 py-4">
                  {userDetailsQuery.data!.description}
                </p>

                <div class="mt-8">
                  <h3 class="font-semibold text-2xl text-gray-800 pb-4 border-b">
                    Posts
                  </h3>
                  <For each={userDetailsQuery.data!.posts}>
                    {(post) => (
                      <div class="flex flex-col py-4 border-b gap-1">
                        <div class="text-lg font-semibold text-gray-700">
                          {post.title}
                        </div>
                        <div class="text-gray-700 leading-none pb-2">
                          {convertDateToString(post.createdAt)}
                        </div>
                        <div class="text-gray-500">{post.summary}</div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </section>
        </Show>
      </div>
    </Suspense>
  );
}
