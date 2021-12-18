import React from "react";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";

import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
} from "@material-ui/core";

export default function Acad(props) {
  const { data, setData, next, back } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Work Details
      </Typography>

      <Formik
        enableReinitialize={true}
        initialValues={{
          company: data.company || "",
          location: data.location || "",
          AboutYourself: data.AboutYourself || "",
          website: data.website || "",
          linkedInUrl: data.linkedInUrl || " ",
        }}
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        onSubmit={async (values) => {
          console.log("Values : ", values);
          setData({ ...data, values });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              {/* {console.log("ACAD : ",values)} */}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="company"
                    name="company"
                    label="Company / University"
                    fullWidth
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="location"
                    name="location"
                    label="Location"
                    fullWidth
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="AboutYourself"
                    name="AboutYourself"
                    label="About Yourself"
                    fullWidth
                    value={values.AboutYourself}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="website"
                    name="website"
                    label="Website"
                    fullWidth
                    value={values.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="linkedInUrl"
                    name="linkedInUrl"
                    label="LinkedIn Url"
                    fullWidth
                    value={values.linkedInUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Box flexGrow={1}>
                      <Button
                        onClick={() => {
                          console.log("Values : ", values);
                          setData({ ...data, ...values });
                          back();
                        }}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Back
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        onClick={() => {
                          console.log("Values : ", values);
                          setData({ ...data, ...values });
                          next();
                        }}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Next
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
}
