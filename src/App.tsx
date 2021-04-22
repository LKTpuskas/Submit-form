import React, { useState } from "react";

import { TabContainer } from "./components/TabContainer";
import { Form } from "./components/Form";
import { PrivacyForm } from "./components/PrivacyForm";
import { useValidationForm, FormCriteria } from "./hooks/useValidationForm";
import { Done } from "./components/Done";
import "./App.css";

export interface TabContentProps {
  label: string;
  children: React.ReactNode;
}

export interface FormResponse extends FormCriteria {
  role?: string;
}

interface Privacy {
  updates: boolean;
  communication: boolean;
}

export interface SubmitResponse {
  form: FormResponse | null;
  privacy?: Privacy;
}

export const TabContent: React.FC<TabContentProps> = () => {
  throw new Error(
    `The TabContent component is not meant to be rendered!
     It's an abstract component that is only valid as a direct Child of the TabContainer Component.
     For custom tabs components use Tabs, TabList, Tab, TabPanels and TabPanel directly`
  );
};

function App() {
  const [tabsIndex, setTabsIndex] = useState(0);
  const formProps = useValidationForm();

  return (
    <div className="App">
      <TabContainer index={tabsIndex} onChange={setTabsIndex}>
        <TabContent label="User">
          <Form validationData={formProps} setTabsIndex={setTabsIndex} />
        </TabContent>
        <TabContent label="Privacy">
          <PrivacyForm validationData={formProps} setTabsIndex={setTabsIndex} />
        </TabContent>
        <TabContent label="Done">
          <Done validationData={formProps} />
        </TabContent>
      </TabContainer>
    </div>
  );
}

export default App;
