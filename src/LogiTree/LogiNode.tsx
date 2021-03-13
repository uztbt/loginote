import { RenderCustomNodeElementFn } from "react-d3-tree/lib/types/common";

export const LogiNode: RenderCustomNodeElementFn = ({ nodeDatum, toggleNode}) => {
  const [x, y] = [0, -50];
  const [width, height] = [100, 100];
  return(
  <g>
    <rect x={x} y={y} width={width} height={height} onClick={toggleNode}>
    </rect>
    <foreignObject x={x} y={y} width={width} height={height}>
      <div className="html-in-node">
        <textarea className="text" rows={2}>
          {nodeDatum.name}
        </textarea>
      </div>
    </foreignObject>      
  </g>
    )
}