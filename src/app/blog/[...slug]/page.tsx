import fs from "fs";
import path from "path";
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

import matter from "gray-matter";

const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

const postsDirectory = path.join(process.cwd(), "src/blogs");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    // const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      // ...matterResult,
      fileContents,
    };
  });
  // Sort posts by date
  // return allPostsData.sort((a, b) => {
  //   if (a.date < b.date) {
  //     return 1;
  //   } else {
  //     return -1;
  //   }
  // });
  // console.log(allPostsData);
  return allPostsData;
}

export async function generateStaticParams() {
  // const posts = await fetch("https://.../posts").then((res) => res.json());

  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: [post.id] }));
}

export default async function Page({ params }) {
  const slug = params.slug.join("/");
  const posts = getSortedPostsData();
  const post = posts.filter((x) => x.id === slug)[0];
  console.log(post.fileContents);
  const res = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkRehype)
    .use(rehypeReact, production)
    // .use(rehypeSanitize)
    // .use(rehypeStringify)
    .process(post.fileContents);
  // console.log("res\n", String(res));
  console.log(res.result);
  return res.result;
}

export const dynamicParams = false;

// return (
//   <p>
//     Post: hi {params.slug} {JSON.stringify(post)}
//   </p>
// );
