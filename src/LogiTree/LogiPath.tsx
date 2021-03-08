import { PathClassFunction, PathFunction } from "react-d3-tree/lib/types/common";

export const getDynamicPathClass: PathClassFunction = ({ source, target}, orientation) => {
  if (!target.children) {
    return 'link__to-leaf';
  }
  return 'link__to-branch';
}

export const StraightPath: PathFunction = (linkDatum, orientation) => {
  const { source, target } = linkDatum;
  return orientation === 'horizontal'
    ? `M${source.y},${source.x}L${target.y},${target.x}`
    : `M${source.x},${source.y}K${target.x},${target.y}`;
}