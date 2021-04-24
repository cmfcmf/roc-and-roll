import clsx from "clsx";
import React from "react";
import { Button } from "./ui/Button";

export function CollapseButton(props: {
  className?: string;
  setCollapsed: (u: (c: boolean) => boolean) => void;
  collapsed: boolean;
}) {
  return (
    <Button
      className={clsx("collapse-button", props.className)}
      onClick={() => {
        props.setCollapsed((collapsed) => !collapsed);
      }}
    >
      {props.collapsed ? "▲" : "▼"}
    </Button>
  );
}