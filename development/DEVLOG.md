# Devlog

## 2021-03-12 at 23.49.35

Foreign objects inside a <foreignObject> tag needs to specify their width and height with "px" appended in order to adopt the view port of the outer svg tag.

![](./images/foreign-elements-must-be-sized-in-px.png)

### As is

* <svg>: 1376 x 975
  * <g>: 520 x 310
    * <path>: 140 x 0
    * <path>: 140 x 140
    * <path>: 140 x 140
    * <path>: 140 x 0
    * <path>: 140 x 0
    * <g>: 100 x 30
      * <g>: 100 x 30
        * <foreignObject x="0" y="-30" width="100" height="30">
    * <g>: 100 x 30
    * <g>: 100 x 30
    * <g>: 100 x 30
    * <g>: 100 x 30

### To be

* <svg>: 1376 x 975
  * <g>: 520 x 310
    * <path>: 140 x 0
    * <path>: 140 x 140
    * <path>: 140 x 140
    * <path>: 140 x 0
    * <path>: 140 x 0
    * <g>: 100 x 30
      * <rect>
      * <foreignObject x="0" y="-30" width="100" height="30">
    * <g>: 100 x 30
    * <g>: 100 x 30
    * <g>: 100 x 30
    * <g>: 100 x 30


## 2021-03-11 at 22.04.59

I [read that setting the tree size is the first step towards expanding the tree to the full of the screen](https://medium.com/@filip.stepien/how-to-scale-a-d3-js-svg-tree-diagram-a7e89b9eebff).
I set it in `index.js` in `node_modules/react-d3-tree/lib/Tree`.
The change in the library only got reflected after restarting the development server by `yarn start`.
Because it seems not right, I feel like finding a better way to do it.
I will try either overriding `Tree.prototype.generateTree` in my code, or forking react-d3-tree.

![](./images/change-in-generate-tree-reflected.png)

I confirmed the tree layout has changed.

![](./images/tree-layout-changed)

### 2021-03-11 at 23.46.45

I succeeded in resizing the tree just by setting the viewbox attribute of the <svg> tag.
My next step is to expand the tree to the full inside the viewbox.

![](./images/viewbox-auto-resizing.gif)
 
## 2021-03-10 at 21.43.14

I found there are two candidate functions that is setting `x` and `y` of a node.
One is `Tree.assignInternalProperties` and another is `Tree.generateTree`.

![](./images/Tree.assignInternalProperties.png)
![](./images/Tree.generateTree.png)

### 2021-03-10 at 21.50.35

I found that `TreeNodeDatum` does not contain `Point`.
**It means that `Tree.assignInternalProperties` has nothing to do with setting the point of a node.**

![](./images/tree-node-datum-does-not-contain-point.png)

### 2021-03-10 at 21.54.24

I found that `RenderCustomNodeElementFn` does not receive the node's point as a parameter.

![](./images/render-custom-node-element-fn-does-not-receive-point.png)

### 2021-03-10 at 22.21.30

Inside `Tree.prototype.generateTree`, `d3_hierarchy.tree()` is called.

![](./images/Tree.generateTree-inside.png)

### 2021-03-10 at 22.20.59

I found that `d3-hierarchy.tree()` decides the points of the nodes based on the Reingold-Tilford "tidy" algorithm, which aligns the nodes by levels.

![](./images/d3-hierarchy-tree.png)

```js
  function sizeNode(node) {
    node.x *= dx;
    node.y = node.depth * dy;
  }
```

### 2021-03-10 at 22.58.00

By seeing [an example of a tidy tree](https://observablehq.com/@d3/tidy-tree), I got an idea that maybe I can still use the tidy algorithm to draw the tree.
My new idea is to always draw the tree as big as possible in the window (you can do so by not setting `nodeSize` for the tree).
Set the size of the input area the same as the calculated node size.
If the input area is too small, your tree is too complex to understand.

## 2021-03-09 at 21.37.07

I found that the nodes in a `linkDatum` has `x` and `y` attribute.
Also, the coordinate system seems 90 degrees rotated from the usual Cartesian coordinates.
Our mission will be to trace down where they are set and change so that they reflect the contents of the node.
![Nodes in linkDatum has x and y](./images/nodes-in-linkDatum-has-x-and-y.png)

### 2021-03-09 at 22.01.50

I found that the node size is globally defined to be `{x:140, y:140}`.

![Node size is globally defined](./images/node-size-is-globally-defined.png)

### 2021-03-09 at 22.09.38

I found that each node is receiving its data, size, and position as props.
It seems that we should change the tree's rendering function, instead of the that of nodes because the tree is managing all the nodes' data.

![](./images/each-node-receives-node-size-and-position-as-props.png)

## 2021-03-08 at 22.50.13

Styled the edges of the graph.
![Graph with styled edges](./images/graph-styled-edges.png)
## 2021-03-05 at 23.38.08

Showed the graph around the center.
I wrote [an article about how to position an SVG element](yuji.page/how-to-position-an-svg-element).
![Graph around center](./images/graph-around-center.png)