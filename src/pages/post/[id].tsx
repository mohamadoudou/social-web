import React, { useState } from "react";
import { NextPage } from "next";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Wrapper } from "../../components/Wrapper";
import { useRouter } from "next/router";
import { usePostQuery } from "../../gql/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";
import Layout from "../../components/Layout";

const Post: NextPage = () => {
  const route = useRouter();
  const [{ data, fetching }] = usePostQuery({
    variables: { postId: Number(route.query.id) },
  });

  if (fetching) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Heading mb={4}>{data.post.title}</Heading>
      <Text>{data.post.text}</Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
