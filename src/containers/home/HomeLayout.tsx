import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { useData } from './DataProvider'

const CustomTab: React.FC<TabProps & { isDisabled: boolean }> = ({
  children,
  isDisabled,
  ...props
}) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" isDisabled={isDisabled} {...props}>
      {children}
    </Tab>
  );
};



const HomeLayout = () => {

  const { state, setState } = useData()!;
  const [currentIndex, setCurrentTabIndex] = useState(0);


  const handleTabChange = (index: number) => {
    setCurrentTabIndex(index);
  };
  const handleReqChange = () => {
    setCurrentTabIndex(1);
  };
  const handleJobPageSubmit = () => {
    setCurrentTabIndex(2);
  };
  const handleJobPageBack = () => {
    setCurrentTabIndex(0);
  };
  const handleInterviewBack = () => {
    setCurrentTabIndex(1);
  }

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs isLazy index={currentIndex} onChange={handleTabChange}>
          <TabList>
            <CustomTab isDisabled={state.requisitionDetails.gender === ""}>Requistion Details</CustomTab>
            <CustomTab isDisabled={state.jobDetails.jobDetails === ""}>Job Details</CustomTab>
            <CustomTab isDisabled={state.interviewSettings.interviewDuration === ""}>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm nextTab={handleReqChange} />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm nextTab={handleJobPageSubmit} previousTab={handleJobPageBack} />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm previousTab={handleInterviewBack} />
              </TabPanel>
            </TabPanels>
            <DisplayCard formData={state} />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
