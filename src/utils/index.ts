export const API_URL =
  "https://expressjs-mongoose-production-a94b.up.railway.app";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const convertDateToString = (timestamp: number) => {
  const date = new Date(timestamp);
  const options = { month: "long", day: "numeric", year: "numeric" };
  // @ts-ignore
  return date.toLocaleDateString("en-US", options);
};

export const statusOptions = [
  { value: "subscribed", label: "Subscribed" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "deactivated", label: "Deactivated" },
];

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IPost {
  title: string;
  summary: string;
  createdAt: number;
}

export interface IUserDetails {
  id: number;
  description: string;
  status: "subscribed" | "active" | "inactive" | "deactivated";
  posts: IPost[];
}
