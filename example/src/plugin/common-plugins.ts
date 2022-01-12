import vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";
import container from "markdown-it-container";
import highlight from "./highlight";
import snippet from "./snippet";
import demo from "./demo";
import createTitle from "./create-title";
import createBlock from "./create-block";
import createDescribe from "./create-describe";
import createTable from "./create-table";
import createComment from "./create-comment";
import createAnchor from "./create-anchor";
import preWrapper from "./pre-wrapper";
import previousNext from "./previous-next";

const plugins = [
  vue({
    include: [/\.vue$/, /\.md$/],
  }),
  Markdown({
    markdownItOptions: {
      html: true,
      linkify: true,
      typographer: true,
      highlight,
    },
    markdownItSetup(md) {
      md.use(snippet)
        .use(preWrapper)
        .use(container, "demo", demo)
        .use(...createTable("table", ""))
        .use(...createBlock("block", ""))
        .use(...createTitle("title", ""))
        .use(...createDescribe("describe", ""))
        .use(...createComment("comment", ""))
        .use(...createAnchor("anchor", ""))
        .use(...previousNext("previousNext", ""));
    },
  }),
] as any;

export default plugins;
