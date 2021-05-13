import React from "react";
import { RRCapPoint, RRPoint } from "../../../shared/state";
import Shape from "@doodle3d/clipper-js";
import { useMyself } from "../../myself";
import { Matrix } from "transformation-matrix";
import { globalToLocal } from "./Map";
import { toCap } from "../../point";

export function FogOfWar({
  revealedAreas,
  transform,
  viewportSize,
}: {
  revealedAreas: RRCapPoint[][] | null;
  transform: Matrix;
  viewportSize: RRPoint;
}) {
  const myself = useMyself();

  if (!revealedAreas) {
    return <></>;
  }

  const remove = new Shape(revealedAreas, true);
  const b = remove.shapeBounds();

  const background = new Shape(
    [
      [
        { X: b.left, Y: b.top },
        { X: b.right, Y: b.top },
        { X: b.right, Y: b.bottom },
        { X: b.left, Y: b.bottom },
      ],
    ],
    true
  );
  const result = background.difference(remove);

  // viewport
  const topLeft = toCap(globalToLocal(transform, { x: 0, y: 0 }));
  const bottomRight = toCap(globalToLocal(transform, viewportSize));
  const viewport = new Shape([
    [
      topLeft,
      { X: bottomRight.X, Y: topLeft.Y },
      bottomRight,
      { X: topLeft.X, Y: bottomRight.Y },
    ],
  ]);
  const outerFill = viewport.difference(background);

  const shapeToSVGPath = (shape: Shape) => (
    <path
      fill={`rgba(0, 0, 0, ${myself.isGM ? 0.3 : 1})`}
      fillRule="evenodd"
      d={
        shape.paths
          .flatMap((p) =>
            p.map((p, i) => (i === 0 ? "M " : "L ") + `${p.X},${p.Y} `)
          )
          .join(" ") + "Z"
      }
    />
  );

  return (
    <>
      {shapeToSVGPath(result)}
      {shapeToSVGPath(outerFill)}
    </>
  );
}