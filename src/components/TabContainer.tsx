import React, { Children } from "react";
import styled from "styled-components";

import { Tab } from "./Tab";

export interface TabContainerProps {
  index: number;
  onChange: (index: number) => void;
  children: Array<React.ReactElement>;
}

const StyledTabContainer = styled.div`
  max-width: 27.5rem;
  margin: 0px auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
`;

const StyledTabs = styled.div`
  display: flex;
  box-shadow: none;
`;

/* 
 TabContainer
 A wrapper component for tabs.
 - Handling logic for displaying the active tab
*/
export function TabContainer({
  index,
  onChange,
  children,
  ...props
}: TabContainerProps) {
  let activePanel;

  const tabs = Children.map(children, (child, childIndex) => {
    const active = childIndex === index;
    const { label, children, ...childProps } = child.props;

    if (active) {
      activePanel = children;
    }

    const tabIndex = active ? 0 : -1;

    return (
      <Tab
        type="button"
        active={active}
        tabIndex={tabIndex}
        onClick={active ? undefined : () => onChange(childIndex)}
        {...childProps}
      >
        {label}
      </Tab>
    );
  });

  return (
    <StyledTabContainer {...props}>
      <StyledTabs>{tabs}</StyledTabs>
      {activePanel}
    </StyledTabContainer>
  );
}
