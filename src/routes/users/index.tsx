import { A, Outlet } from "solid-start";
import { createQuery } from "@tanstack/solid-query";
import { Component, For, createSignal } from "solid-js";
import { API_URL, IUser, sleep } from "../../utils";
import { reconcile } from "solid-js/store";
import { Key } from "@solid-primitives/keyed";

export default function EmptyRoute() {
  return (
    <div class="flex-1 p-8 flex">
      <div class="border-4 border-dashed p-4 flex-1 flex-col rounded-xl flex items-center justify-center">
        <h2 class="text-3xl text-gray-500 font-semibold">User Profile Page</h2>
        <p class="text-lg text-gray-500">Select user to see user details</p>
      </div>
    </div>
  );
}
