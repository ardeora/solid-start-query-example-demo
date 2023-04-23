import { A, Outlet, useParams } from "solid-start";
import { createQuery } from "@tanstack/solid-query";
import {
  Component,
  For,
  Match,
  Show,
  Suspense,
  Switch,
  createSignal,
} from "solid-js";
import {
  API_URL,
  IUser,
  IUserDetails,
  convertDateToString,
  sleep,
} from "../../utils";
import { isServer } from "solid-js/web";

export default function UserProfile() {
  const params = useParams();

  const userQuery = createQuery(() => ({
    queryKey: ["users", params.id],
    queryFn: async ({ queryKey }) => {
      const [key, id] = queryKey;
      const response = await fetch(`${API_URL}/users/${id}`).then((res) =>
        res.json()
      );
      return response as IUser;
    },
  }));

  const userDetailsQuery = createQuery(() => ({
    queryKey: ["user_details", params.id],
    queryFn: async ({ queryKey }) => {
      const [key, id] = queryKey;
      await sleep(1000);
      const response = await fetch(`${API_URL}/user_details/${params.id}`).then(
        (res) => res.json()
      );
      return response as IUserDetails;
    },
  }));

  return (
    <Suspense fallback={<Skeleton />}>
      <div class="flex-1 overflow-y-auto">
        <Show when={userQuery.data && userDetailsQuery.data}>
          <Banner data={userQuery.data!} />
          <UserDetails
            user={userQuery.data!}
            details={userDetailsQuery.data!}
          />
        </Show>
      </div>
    </Suspense>
  );
}

const Banner: Component<{ data: IUser }> = (props) => {
  return (
    <section class="relative">
      <div class="relative h-56 overflow-hidden">
        <div class="relative w-[120%] h-56 left-1/2 -translate-x-1/2">
          <img
            class="absolute h-full w-full object-cover opacity-70"
            src={`https://source.boringavatars.com/marble/120/${props.data.username}?colors=541e35,df5d2e,ffb43e,a4c972,6bb38e`}
            alt="User cover"
          />
        </div>
      </div>
      <div class="absolute h-48 w-48 bottom-[5%] left-12 translate-y-1/2 rounded-full overflow-hidden border-[12px] shadow-lg border-white">
        <img
          class="absolute h-full w-full object-cover"
          src={`https://source.boringavatars.com/marble/120/${props.data.username}?colors=541e35,df5d2e,ffb43e,a4c972,6bb38e`}
          alt="User cover"
        />
        <img
          class="absolute h-full w-full bottom-0 left-1/2 -translate-x-1/2 z-10"
          src={props.data.avatar}
          alt={`${props.data.firstName} ${props.data.lastName}`}
        />
      </div>
    </section>
  );
};

const UserDetails: Component<{ user: IUser; details: IUserDetails }> = (
  props
) => {
  return (
    <section class="">
      <div class="container max-w-5xl py-6">
        <div class="ml-72 pr-8">
          <h1 class="font-bold text-gray-900 text-4xl">
            {props.user.firstName} {props.user.lastName}
          </h1>
          <Switch>
            <Match when={props.details.status === "active"}>
              <p class="text-green-600 py-1.5 rounded-full px-6 mt-4 inline-block bg-green-100">
                <span class="font-semibold">Active</span>
              </p>
            </Match>
            <Match when={props.details.status === "subscribed"}>
              <p class="text-blue-600 py-1.5 rounded-full px-6 mt-4 inline-block bg-blue-100">
                <span class="font-semibold">Subscribed</span>
              </p>
            </Match>
            <Match when={props.details.status === "inactive"}>
              <p class="text-gray-600 py-1.5 rounded-full px-6 mt-4 inline-block bg-gray-100">
                <span class="font-semibold">Inactive</span>
              </p>
            </Match>
            <Match when={props.details.status === "deactivated"}>
              <p class="text-red-600 py-1.5 rounded-full px-6 mt-4 inline-block bg-red-100">
                <span class="font-semibold">Deactivated</span>
              </p>
            </Match>
          </Switch>
          <p class="text-gray-500 py-4">{props.details.description}</p>

          <div class="mt-8">
            <h3 class="font-semibold text-2xl text-gray-800 pb-4 border-b">
              Posts
            </h3>
            <For each={props.details.posts}>
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
  );
};

const Skeleton = () => {
  return (
    <div class="flex-1 flex justify-center items-center flex-col gap-4">
      <div class="relative stroke-gray-600 animate-spin">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.453 12.893C20.1752 15.5029 18.6964 17.9487 16.2494 19.3614C12.1839 21.7086 6.98539 20.3157 4.63818 16.2502L4.38818 15.8172M3.54613 11.107C3.82393 8.49711 5.30272 6.05138 7.74971 4.63862C11.8152 2.29141 17.0137 3.68434 19.3609 7.74983L19.6109 8.18285M3.49316 18.0661L4.22521 15.334L6.95727 16.0661M17.0424 7.93401L19.7744 8.66606L20.5065 5.93401"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="text-gray-600 text-xl font-medium">
        {isServer
          ? "Streaming Data From The Server!"
          : "Loading On The Client!"}
      </div>
    </div>
  );
};
