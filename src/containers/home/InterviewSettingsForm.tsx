import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useData } from './DataProvider'
import * as Yup from "yup";
import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions, interviewLanguageOptions, interviewModeOptions,
} from "./constants";

const InterviewDetailsForm: React.FC<{ previousTab: () => void }> = ({ previousTab }) => {


  const { state, setState } = useData()!;

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      //initialize the state (initial values)
      interviewDuration: state.interviewSettings.interviewDuration,
      interviewLanguage: state.interviewSettings.interviewLanguage,
      interviewMode: state.interviewSettings.interviewMode,
    },
    validationSchema: Yup.object().shape({
      interviewDuration: Yup.string().required("interviewMode is required"),
      interviewLanguage: Yup.string().required("interviewLanguage is required"),
      interviewMode: Yup.string().required("interviewMode is required"),
    }),
    onSubmit: (values) => {
      //this will ensure that the values in the fields will remain even after changing the pages
      setState({
        requisitionDetails: {
          gender: state.requisitionDetails.gender,
          noOfOpenings: state.requisitionDetails.noOfOpenings,
          requisitionTitle: state.requisitionDetails.requisitionTitle,
          urgency: state.requisitionDetails.urgency,
        },
        jobDetails: {
          jobDetails: state.jobDetails.jobDetails,
          jobLocation: state.jobDetails.jobLocation,
          jobTitle: state.jobDetails.jobTitle,
        },
        interviewSettings: {
          interviewDuration: values.interviewDuration,
          interviewLanguage: values.interviewLanguage,
          interviewMode: values.interviewMode,
        },
      })
      if (values.interviewMode) {
        alert("Form successfully submitted");
      }
      else {
        alert("Form Fields Empty");
      }
    },
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      interviewSettings: {
        ...prevState.interviewSettings,
        interviewDuration: values.interviewDuration,
        interviewLanguage: values.interviewLanguage,
        interviewMode: values.interviewMode,
      }
    }));
  }, [values, setState]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => previousTab()}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
