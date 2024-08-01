import '@mantine/dropzone/styles.css';

import { Avatar, AvatarProps, Box, Card, Flex, Group, Modal, ModalProps, SimpleGrid, Space, Text, Transition, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconEdit, IconPencil } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import AppButton from '../Button/AppButton';
import useSPETranslation from '@/hooks/useSPETranslation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getUploadUrlApi, updateUserApi } from '@/services/apis';
import { ImageType, UserUpdateType } from '@/types';
import { useDisclosure, useHover } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authStore from '@/store/auth';
import { error, success } from '@/utils/notifications';


function readFile(files: FileWithPath[], fn: (avatar: any) => void) {
    if (!files || !files[0]) return;
    const FR = new FileReader();
    FR.addEventListener("load", function (evt) {
        if (evt) {
            console.log("EVT", evt)
            let res = evt.target?.result
            fn(res)
        }
    });
    FR.readAsDataURL(files[0]);
}

export function AvatarUploader(props: Partial<DropzoneProps>) {
    return (
        <>
            <Dropzone
                onDrop={(files) => {
                    console.log('accepted files', files)

                }}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                styles={{
                    inner: {
                        height: "100%",
                    }
                }}
                {...props}
            >
                <Group h={"100%"} justify="center" align="center" gap="xl" style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>
                </Group>
            </Dropzone>
        </>
    );
}


export function SPEAvatar(props: Partial<AvatarProps> & { isEdit?: boolean, modalProps?: Partial<ModalProps> }) {
    const { me } = authStore();
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const { hovered, ref } = useHover();

    const [files, setFiles] = useState<FileWithPath[]>([])
    const [avatar, setAvatar] = useState("")
    const [loading, setLoading] = useState(false)

    const t = useSPETranslation()

    const isHasFiles = useMemo(() => {
        return files?.length > 0
    }, [files])

    const uploadAvatar = async () => {
        if (files.length > 0) {
            const file = files[0]
            console.log('accepted files', file)
            setLoading(true)
            const enpoint = await getUploadUrlApi(ImageType.AVATAR, file.name)
            try {
                await axios.put(enpoint, avatar, {
                    headers: {
                        "Content-Type": file.type,
                    }
                })
                updateUserApi(UserUpdateType.AVATAR, {
                    avatar: `${import.meta.env.APP_UPLOAD_URL}/${me?.id}/${file.name}`
                }).then(res => {
                    close()
                    navigate(0)
                    success(t("Success"), t("Avatar has been changed"));
                }).finally(() => {
                    setLoading(false)
                })
            }catch(err) {
                setLoading(false)
                error(
                    t("Error Occurred While Uploading Image"),
                    t("An error occurred while trying to upload the image. Please check your file and try again."),
                );
            }
        }
    }

    const cancelUploadAvatar = () => {
        setFiles([])
        setAvatar("")
    }

    const processAvatar = (files: FileWithPath[]) => {
        readFile(files, (avatar) => {
            setAvatar(avatar as string)
        })
    }

    const openModal = () => {
        if (!props.isEdit) { return }
        setFiles([])
        open()
    }

    return (
        <>
            <Box ref={ref} pos={"relative"} w={props.size} onClick={openModal} style={{
                cursor: props.isEdit ? "pointer" : "default"
            }}>
                <Box opacity={hovered ? 1 : 0} pos={"absolute"} bottom={0} right={0} style={{
                    cursor: "pointer"
                }}>
                    <IconPencil size={18} opacity={0.6} />
                </Box>
                <Avatar {...props} src={props.src} />
            </Box>
            <Modal closeOnClickOutside={false} opened={opened} onClose={close} title={t("Upload Picture")} centered {...props.modalProps}>
                {!isHasFiles && <AvatarUploader multiple={false} h={"300px"} onDrop={(files) => {
                    console.log('accepted files', files)
                    setFiles(files)
                    processAvatar(files)
                }} />}
                {isHasFiles && <>
                    <Flex justify={"center"} align={"center"} pos={"relative"} w={"100%"} h={"300px"}>
                        <Avatar size={300} src={avatar} />
                    </Flex>
                </>}
                <Space my={"md"} />
                <SimpleGrid cols={2}>
                    <AppButton disabled={!isHasFiles || loading} fullWidth onClick={cancelUploadAvatar} c={"gray"} variant='outline'>{t("Cancel")}</AppButton>
                    <AppButton disabled={!isHasFiles || loading} loading={loading} fullWidth onClick={uploadAvatar}>{t("Confirm")}</AppButton>
                </SimpleGrid>
            </Modal>
        </>
    )
}
