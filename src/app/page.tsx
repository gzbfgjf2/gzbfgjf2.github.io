import { getSortedPostsData } from "@/lib/post";
import Link from "next/link";

export default function Home() {
  const posts = getSortedPostsData();
  return (
    <div className="flex flex-col items-center">
      <div className="min-w-full text-center backdrop-blur border min-h-10 bg-gray-50/50 ">
        header
      </div>
      <div>
        {posts.map((x) => (
          <Link href={`/blog/${x.id}`} key={x.id}>
            {x.id}
          </Link>
        ))}
      </div>
    </div>
  );
}
