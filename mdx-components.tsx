import type { MDXComponents } from "mdx/types";
import Chart from "@/app/components/essay/Chart";
import EssayHeader from "@/app/components/essay/EssayHeader";
import { Figure, PullQuote, TableScroll } from "@/app/components/essay/Blocks";

// Components available inside every essay without importing them.
const components: MDXComponents = {
  Chart,
  EssayHeader,
  Figure,
  PullQuote,
  table: (props) => (
    <TableScroll>
      <table {...props} />
    </TableScroll>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
