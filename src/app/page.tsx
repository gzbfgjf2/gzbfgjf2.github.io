import { getSortedPostsData } from "@/lib/post";
import Link from "next/link";

export default function Home() {
  const posts = getSortedPostsData();
  return (
    <div className="flex flex-col items-center w-full pt-5">
      {posts.map((x) => (
        <div
          key={x.id}
          className="bg-gray-600 w-full text-center p-5 [&:not(:last-child)]:mb-5 flex flex-col"
        >
          <Link href={`/blog/${x.id}`} key={x.id}>
            {x.id}
          </Link>
        </div>
      ))}
    </div>
  );
}
