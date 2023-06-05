import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { InputField } from "../../../components/InputField";
import Layout from "../../../components/Layout";
import { MutationUpdatePostArgs } from "../../../gql/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import createPost from "../../create-post";

const EditPost = ({}) => {
  const [, editPost] = useUpdatePostMutation;

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          return createPost({ input: values }).then((response) => {
            route.push("/");
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="tile" label="Title" />
            <Box mt={4}>
              <InputField
                isTextArea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
