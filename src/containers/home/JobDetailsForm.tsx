import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useData } from './DataProvider'

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";

const JobDetailsForm: React.FC<{
  nextTab: () => void;
  previousTab: () => void;
}> = ({ nextTab, previousTab }) => {

  const { state, setState } = useData()!;
  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobDetails: state.jobDetails.jobDetails,
        jobLocation: state.jobDetails.jobLocation,
        jobTitle: state.jobDetails.jobTitle,
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
        // jobPosition: Yup.string().required("Job position is required"),
      }),
      onSubmit: (values) => {
        // console.log(values);
        // Go to next step
        setState({
          requisitionDetails: {
            gender: state.requisitionDetails.gender,
            noOfOpenings: state.requisitionDetails.noOfOpenings,
            requisitionTitle: state.requisitionDetails.requisitionTitle,
            urgency: state.requisitionDetails.urgency,
          },
          jobDetails: {
            jobDetails: values.jobDetails,
            jobLocation: values.jobLocation,
            jobTitle: values.jobTitle,
          },
          interviewSettings: {
            interviewDuration: state.interviewSettings.interviewDuration,
            interviewLanguage: state.interviewSettings.interviewLanguage,
            interviewMode: state.interviewSettings.interviewMode,
          },
        })
        nextTab()
      },
    });


  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      jobDetails: {
        ...prevState.jobDetails,
        jobDetails: values.jobDetails,
        jobLocation: values.jobLocation,
        jobTitle: values.jobTitle,
      }
    }));
  }, [values, setState]);


  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.jobTitle}
          error={errors.jobTitle}
          touched={touched.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.jobDetails}
          error={errors.jobDetails}
          touched={touched.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => previousTab()}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;