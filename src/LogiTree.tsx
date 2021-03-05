import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import './LogiTree.css'

interface Props {
  data: RawNodeDatum[] | RawNodeDatum;
}

export const LogiTree: React.FC<Props> = ({data}) => {
  const [translate, setTranslate] = useState({x: 200, y: 200});
  const treeContainer = useRef<HTMLDivElement>(null);
  useEffect(()=> {
    const dimensions = treeContainer.current?.getBoundingClientRect();
    if (dimensions !== undefined) {
      setTranslate({x: dimensions.width / 4, y: dimensions.height / 2});
    }
  },
  [treeContainer])
  return (
    <div ref={treeContainer} className="tree-container">
      <Tree
        data={data}
        translate={translate}
         />
    </div>
  );
}