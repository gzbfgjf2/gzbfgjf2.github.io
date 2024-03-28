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
import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/atom-one-light.css";
import { CodeBlock } from "@/lib/code";
import React from "react";
import remarkFrontmatter from "remark-frontmatter";
import matter from "gray-matter";
import { matter as vmatter } from "vfile-matter";

const rehypeReactOption = {
  Fragment: prod.Fragment,
  jsx: prod.jsx,
  jsxs: prod.jsxs,
  components: {
    div: function({ children, className }: JSX.IntrinsicElements["h1"]) {
      return <div className={className}>{children}</div>;
    },
    code: CodeBlock,
    pre: function({ children, className }: JSX.IntrinsicElements["pre"]) {
      return (
        <pre
          className={
            className +
            "min-w-full !bg-gray-50 !mb-5 last:!mb-0  "
          }
        >
          {children}
        </pre>
      );
    },
  },
};

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
    .use(remarkFrontmatter, ["yaml", "toml"])
    .use(handleYamlMatter)
    .use(remarkRehype)
    .use(insertTitle)
    .use(rehypeHighlight)
    // @ts-expect-error: the react types are missing.
    .use(rehypeReact, rehypeReactOption)
    // .use(function () {
    //   return function (tree, file) {
    //     console.dir(tree);
    //     console.dir(file);
    //   };
    // })
    .process(post.fileContents);
  return res.result;
}

// export const dynamicParams = false;
// import {matter} from 'vfile-matter'

/**
 * Parse YAML frontmatter and expose it at `file.data.matter`.
 *
 * @returns
 *   Transform.
 */

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('vfile').VFile} VFile
 */
function handleYamlMatter() {
  return function(tree: any, file: any) {
    vmatter(file);
    // console.log('file', file)
  };
}

const insertTitle = () => (tree: any, file: any) => {
  const titleNode = {
    type: "element",
    tagName: "h1",
    properties: {
      className: ["text-balance"],
    },
    children: [{ type: "text", value: file.data.matter.title }],
  };
  const dateNode = {
    type: "element",
    tagName: "h5",
    properties: {
      className: [" !mb-10"],
    },
    children: [{ type: "text", value: file.data.matter.date }],
  };
  // Insert the title at the beginning of the body
  tree.children.unshift(titleNode, dateNode);
};
