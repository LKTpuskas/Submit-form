import React from "react";
import styled from "styled-components";

export interface TabProps {
  active: boolean;
  tabIndex: number;
  className: string;
  children: React.ReactElement;
  menu?: React.ReactElement;
}

const Button = styled.button<{ active: boolean }>`
  border: ${({ active }) =>
    active ? "none" : "0.125rem solid rgb(13, 102, 229)"};
  background-color: ${({ active }) => (active ? "rgb(13, 102, 229)" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  width: 100%;
  padding: 8px 0;
  outline: none;
`;

export function Tab({
  tabIndex,
  menu,
  className,
  active,
  children,
  ...props
}: TabProps) {
  return (
    <Button role="tab" active={active} {...props}>
      {children}
    </Button>
  );
}
