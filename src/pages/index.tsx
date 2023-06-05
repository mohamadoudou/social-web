import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Layout from "../components/Layout";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
  useVoteMutation,
} from "../gql/graphql";
import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";

const Index = () => {
  const [variables, setVariables] = useState({ limit: 5, cursor: null });
  const [{ data, fetching }] = usePostsQuery({ variables });
  const [, vote] = useVoteMutation();
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (!fetching && !data) {
    return <div>You don't have any post yet, create one!!!</div>;
  }
  return (
    <Layout variant="regular">
      <Flex align="center">
        <Heading>SoCial</Heading>
        <Link ml="auto">
          <NextLink href="/create-post">Create post</NextLink>
        </Link>
      </Flex>
      <br />
      {!data && fetching ? (
        <div> loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.posts?.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth={"1px"}>
                <Flex
                  direction="column"
                  justifyContent={"center"}
                  alignItems="center"
                  mr={4}
                >
                  <IconButton
                    aria-label="up vote"
                    colorScheme={p.voteStatus === 1 ? "green" : undefined}
                    icon={<ChevronUpIcon />}
                    onClick={() => {
                      vote({ value: 1, postId: p.id });
                    }}
                  />
                  {p.points}
                  <IconButton
                    aria-label="down vote"
                    colorScheme={p.voteStatus === -1 ? "red" : undefined}
                    icon={<ChevronDownIcon />}
                    onClick={() => {
                      vote({ value: -1, postId: p.id });
                    }}
                  />
                </Flex>
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Heading fontSize="xl">{p.title}</Heading>
                  </NextLink>
                  <Text>posted by {p.creator.username}</Text>
                  <Flex align={"center"}>
                    <Text flex={1} mt={4}>
                      {p.text}
                    </Text>
                    {meData.me.id !== p.creatorId ? null : (
                      <Box>
                        <NextLink
                          href={"/post/edit/[id]"}
                          as={`/post/edit/${p.id}`}
                        >
                          <IconButton
                            mr={2}
                            ml={2}
                            as={Link}
                            aria-label="edit"
                            colorScheme={"green"}
                            icon={<EditIcon />}
                          />
                        </NextLink>
                        <IconButton
                          aria-label="delete Icon"
                          colorScheme={"red"}
                          icon={<DeleteIcon />}
                          onClick={() => {
                            deletePost({ deletePostId: p.id });
                          }}
                        />
                      </Box>
                    )}
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
