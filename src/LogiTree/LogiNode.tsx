import { RenderCustomNodeElementFn } from "react-d3-tree/lib/types/common";

export const LogiNode: RenderCustomNodeElementFn = ({ nodeDatum, toggleNode}) => {
  const [x, y] = [0, -30];
  const [width, height] = [100, 30];
  return(
  <g>
    <foreignObject x={x} y={y} width={width} height={height}>
      <form className="html-in-node">
        <input type="text" className="text" value={nodeDatum.name} />
      </form>
    </foreignObject>      
  </g>
    )
}