import { getSortedPostsData } from "@/lib/post";
import Link from "next/link";

export default function Home() {
  const posts = getSortedPostsData();
  return (
    <div className="flex flex-col items-center w-full">
      {posts.map((x) => (
        <div
          key={x.id}
          className="  bg-gray-600 w-full text-center px-5 py-10 text-white [&:not(:last-child)]:mb-5 flex flex-col"
        >
          <Link href={`/blog/${x.id}`} key={x.id}>
            <div className="font-bold p-2">{x.meta.data.title}</div>
            <div className="p-2">{x.meta.data.date}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
