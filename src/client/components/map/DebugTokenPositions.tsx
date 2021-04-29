import React from "react";
import { RRMapObject } from "../../../shared/state";

export function DebugTokenPositions(props: {
  localMapObjects: RRMapObject[];
  serverMapObjects: RRMapObject[];
}) {
  const mapObjectIds = [
    ...new Set([
      ...props.localMapObjects.map((t) => t.id),
      ...props.serverMapObjects.map((t) => t.id),
    ]),
  ];
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        background: "orange",
        maxWidth: "100%",
        overflowY: "auto",
        maxHeight: "100vh",
      }}
    >
      <h3>Debug: map object positions</h3>
      <table cellPadding={8}>
        <thead>
          <tr>
            <th>RRMapObjectID</th>
            <th>Server .position</th>
            <th>Local .position</th>
            <th>Diff .position</th>
          </tr>
        </thead>
        <tbody>
          {mapObjectIds.map((mapObjectId) => {
            const serverMapObject =
              props.serverMapObjects.find((each) => each.id === mapObjectId) ??
              null;
            const localMapObject =
              props.localMapObjects.find((each) => each.id === mapObjectId) ??
              null;
            return (
              <tr key={mapObjectId}>
                <td>{mapObjectId}</td>
                <td>
                  x: {serverMapObject?.position.x}
                  <br />
                  y: {serverMapObject?.position.y}
                </td>
                <td>
                  x: {localMapObject?.position.x}
                  <br />
                  y: {localMapObject?.position.y}
                </td>
                <td>
                  {localMapObject && serverMapObject && (
                    <>
                      x:{" "}
                      {localMapObject.position.x - serverMapObject.position.x}
                      <br />
                      y:{" "}
                      {localMapObject.position.y - serverMapObject.position.y}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}