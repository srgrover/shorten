
'use client';

import { Box, Dialog, Flex, Select, TextArea, TextField, Text, Heading } from '@radix-ui/themes/components/index';
import { FaArrowsRotate } from 'react-icons/fa6';
import { LuLink, LuRocket, LuTags } from 'react-icons/lu';
import type { Tags } from "@prisma/client";
import { Button } from './button';
// import { z } from "zod"

interface Props {
    children: React.ReactNode
    tags: Tags[];
}

// const formSchema = z.object({
//     url: z.string().min(2, {
//       message: "Username must be at least 2 characters.",
//     }),
//   })

export const NewLinkModal = ({ children, tags }: Props) => {
    console.log(tags)
    return (
        <Dialog.Root>
            <Dialog.Trigger>{children}</Dialog.Trigger>
            <Dialog.Content maxWidth="500px">
                <Dialog.Title>
                    <Heading size="4" weight="bold" color="gray">Create a link</Heading>
                </Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Complete the form below to add a new link.
                </Dialog.Description>

                <Flex direction="column" gap="5">
                    <Flex direction="column" gap="1">
                        <Text weight="medium" size="2" as="label">
                            Destination URL:
                        </Text>

                        <TextField.Root
                            // defaultValue="Freja Johnsen"
                            placeholder="https://'"
                        />
                    </Flex>

                    <Flex direction="column" gap="1">
                        <Box>
                            <TextField.Root placeholder="MyL1nk" size="2">
                                <TextField.Slot>
                                    <LuLink size={16} />
                                </TextField.Slot>
                                <TextField.Slot>
                                    <Button size="default" variant="ghost">
                                        <FaArrowsRotate size={14} />
                                        <Text weight="medium" size="2" as="label">
                                            Ramdom
                                        </Text>
                                    </Button>
                                </TextField.Slot>
                            </TextField.Root>
                        </Box>
                    </Flex>

                    <Flex direction="column" gap="1">
                        <Text weight="medium" size="2" as="label">
                            Description (optional):
                        </Text>
                        <Box>
                            <TextArea size="3" placeholder="Enter a description" />
                        </Box>
                    </Flex>

                    {
                        tags.length > 0
                            ? <Flex direction="column" gap="1">
                                <Select.Root>
                                    <Text weight="medium" size="2" as="label">Add tags to your link:</Text>
                                    <Select.Trigger placeholder="Select a tag" color="gray" />
                                    <Select.Content color="gray" variant="solid">
                                        <Select.Group>
                                            {
                                                tags.map((tag) => <Select.Item value={tag.name}>{tag.name}</Select.Item>)
                                            }
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                            </Flex>
                            : <Box p="4" className='border border-gray-300 rounded-md'>
                                <Flex direction="row" gap="1" justify="start" align="center">
                                    <LuTags size={16} />
                                    <Text weight="medium" size="2" as="label">
                                        You don't have any tag created.
                                    </Text>
                                </Flex>
                            </Box>
                    }
                </Flex>

                <Flex gap="3" mt="4" justify="end" align="center">
                    <Dialog.Close>
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button variant="destructive">
                            <LuRocket size={16} />
                            Create
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
