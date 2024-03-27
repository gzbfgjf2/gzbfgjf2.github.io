import { getSortedPostsData } from "@/lib/post";
import Link from "next/link";

export default function Home() {
  const posts = getSortedPostsData();
  return (
    <div className="flex flex-col items-center w-full">
      {posts.map((x) => (
        <div
          key={x.id}
          className="  bg-gray-50 w-full text-center [&:not(:last-child)]:mb-5 flex flex-col"
        >
          <Link href={`/blog/${x.id}`} key={x.id}>
            <div className="p-10">
              <div className="font-bold">{x.meta.data.title}</div>
              <div className="">{x.meta.data.date}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
