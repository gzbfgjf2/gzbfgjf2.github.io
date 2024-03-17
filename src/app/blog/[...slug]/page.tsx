import { unified } from "unified";
// import { useMemo } from "react";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import { Fragment, createElement } from "react";
import * as prod from "react/jsx-runtime";
import { getSortedPostsData } from "@/lib/post";

import matter from "gray-matter";

const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: [post.id] }));
}

export default async function Page({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join("/");
  const posts = getSortedPostsData();
  const post = posts.filter((x) => x.id === slug)[0];
  const res = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkRehype)
    // @ts-expect-error: the react types are missing.
    .use(rehypeReact, production)
    .process(post.fileContents);
  return res.result;
}

export const dynamicParams = false;
