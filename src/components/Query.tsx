import { A, Outlet } from "solid-start";
import { createQuery } from "@tanstack/solid-query";
import { Component, For, createSignal } from "solid-js";
import { API_URL, IUser, sleep } from "../utils";
import { reconcile } from "solid-js/store";
import { Key } from "@solid-primitives/keyed";

export const Query = () => {
  const [count, setCount] = createSignal(1);
  const [search, setSearch] = createSignal("");

  const usersQuery = createQuery(() => ({
    queryKey: [
      "users",
      {
        search: search(),
      },
    ],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/users?search=${search()}`).then(
        (res) => res.json()
      );
      return response as IUser[];
    },
    placeholderData: (prev) => prev,
  }));

  return (
    <div class="flex-1 flex overflow-hidden">
      <div class="w-96 flex flex-col border-r">
        <div class="text-gray-700 pt-4 pb-3 px-4 text-xl font-semibold">
          Users
        </div>
        <SearchInput search={search()} setSearch={setSearch} />
        <div
          class={`flex-1 px-4 overflow-y-auto flex flex-col gap-2 ${
            usersQuery.isFetching ? "opacity-60" : ""
          }`}
        >
          <Key each={usersQuery.data} by={(user) => user.id}>
            {(user) => <UserCard user={user()} />}
          </Key>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

const UserCard: Component<{ user: IUser }> = (props) => {
  return (
    <A
      href={`./${props.user.id}`}
      class="flex gap-4 px-4 py-3 border rounded-md shadow items-center hover:bg-gray-50"
    >
      <div class="relative">
        <div class="h-12 w-12 saturate-150 contrast-150 absolute rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 overflow-hidden">
          <img
            class="absolute h-full w-full bottom-0 left-1/2 -translate-x-1/2 opacity-30"
            src={`https://source.boringavatars.com/marble/120/${props.user.username}?colors=541e35,df5d2e,ffb43e,a4c972,6bb38e`}
          />
        </div>
        <div class="h-10 w-10 rounded-full relative overflow-hidden">
          <img
            class="absolute h-full w-full bottom-0 left-1/2 -translate-x-1/2 opacity-50"
            src={`https://source.boringavatars.com/marble/120/${props.user.username}?colors=541e35,df5d2e,ffb43e,a4c972,6bb38e`}
          />
          <img
            class="absolute h-10 w-10 bottom-0 left-1/2 -translate-x-1/2 z-10"
            src={props.user.avatar}
            alt={`${props.user.firstName} ${props.user.lastName}`}
          />
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <p class="font-semibold text-gray-700 leading-none">
          {props.user.firstName} {props.user.lastName}
        </p>
        <p class="text-sm text-gray-500 leading-none">@{props.user.username}</p>
      </div>
    </A>
  );
};

const SearchInput: Component<{
  search: string;
  setSearch: (s: string) => void;
}> = (props) => {
  return (
    <form class="pb-4 px-4">
      <label hidden class="text-gray-700 text-sm font-semibold" for="search">
        Search Users
      </label>
      <div class="flex search-bar border hover:bg-gray-200/80 rounded-md py-2 px-2 items-center bg-gray-100 gap-2">
        <span class="stroke-gray-600">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <input
          id="search"
          class="flex-1 bg-transparent outline-none lea"
          type="text"
          value={props.search}
          placeholder="Search Users"
          onInput={(e) => props.setSearch(e.currentTarget.value)}
        ></input>
      </div>
    </form>
  );
};
