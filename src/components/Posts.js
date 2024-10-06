'use client';
import { getCookie, sendGetRequest } from '@/functions/utilities';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import Empty from './Empty';
import { ConfigProvider, Menu } from 'antd';
import { DollarOutlined, EditOutlined, HomeOutlined, OpenAIOutlined } from '@ant-design/icons';
import EmptyHappy from './EmptyHappy';


export default function Posts({ userData }) {
    const [mediaData, setMediaData] = useState();
    const [loading, setLoading] = useState(false);
    const [preLoading, setPreLoading] = useState(false);
    const [nextLoading, setNextLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const [commentsData, setCommentsData] = useState(null);
    const [loadingComments, setLoadingComments] = useState(false);
    const [preLoadingComments, setPreLoadingComments] = useState(false);
    const [nextLoadingComments, setNextLoadingComments] = useState(false);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [current, setCurrent] = useState('manual');


    const items = [
        {
            label: 'Manual Moderation',
            key: 'manual',
            icon: <EditOutlined />,
        },
        {
            label: 'AI Moderation',
            key: 'ai',
            icon: <OpenAIOutlined />,
        }
    ];

    const showModal = (item) => {
        setIsModalOpen(true);
        setSelectedPost(item);
        setCommentsData(null);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
        setCommentsData(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
        setCommentsData(null);
    };

    const getUserMedia = (paginatedUrl, type = null) => {
        const requestUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=${userData?.instagramToken}?`
        let reqBody = {
            url: paginatedUrl ? paginatedUrl : requestUrl,
            body: null,
            type: "GET"
        }
        !type && setLoading(true);
        type === "pre" && setPreLoading(true);
        type === "next" && setNextLoading(true);
        axios.post('/api/instagram', reqBody).then((res) => {
            let mediaData = res.data;
            setMediaData(mediaData);
            console.log("getUserMedia", mediaData);
            setLoading(false);
            setPreLoading(false);
            setNextLoading(false);
        }).catch((error) => {
            console.error("Error writing document: ", error);
            setLoading(false);
        });
    };

    const getPostComments = (paginatedUrl, mediaId, type = null) => {
        const requestUrl = `https://graph.instagram.com/v21.0/${mediaId}/comments/?fields=id,text,timestamp&access_token=${userData?.instagramToken}`
        let reqBody = {
            url: paginatedUrl ? paginatedUrl : requestUrl,
            body: null,
            type: "GET"
        }
        !type && setLoadingComments(true);
        type === "pre" && setPreLoadingComments(true);
        type === "next" && setNextLoadingComments(true);
        axios.post('/api/instagram', reqBody).then((res) => {
            let commentsData = res.data;
            setCommentsData(commentsData);
            setLoadingComments(false);
            setPreLoadingComments(false);
            setNextLoadingComments(false);
        }).catch((error) => {
            console.error("Error writing document: ", error);
            setLoadingComments(false);
            setPreLoadingComments(false);
            setNextLoadingComments(false);

        });
    };

    const deleteComment = (commentId) => {
        setDeleteLoading(true);
        let deleteUrl = `https://graph.instagram.com/v21.0/${commentId}?access_token=${userData?.instagramToken}`
        let reqBody = {
            url: deleteUrl,
            body: null,
            type: "DELETE"
        }
        axios.post('/api/instagram', reqBody).then((res) => {
            console.log("deleteComment", res.data);
            getPostComments(null, selectedPost?.id, null);
            setDeleteLoading(false);
        }).catch((error) => {
            console.error("Error writing document: ", error);
            setDeleteLoading(false);
        });
    }


    // const commentsAnalyser = () => {
    //     setLoadingAi(true);

    //     let body = {
    //         commentsData: comments
    //     }

    //     console.log("commentsAnalyser", comments);

    //     axios.post('/api/openai', body).then((res) => {
    //         console.log("res", res.data);
    //         setLoadingAi(false);
    //     }).catch((error) => {
    //         setLoadingAi(false);
    //         console.error("Error writing document: ", error);
    //     });
    // }



    // const getAllComments = (paginatedUrl, commentsData = [], iteration = 1) => {
    //     const reqBody = {
    //         url: paginatedUrl,
    //         body: null,
    //         type: "GET"
    //     };

    //     return axios.post('/api/instagram', reqBody)
    //         .then((res) => {
    //             const responseData = res.data;
    //             commentsData.push(...responseData?.data);
    //             if (responseData?.paging?.next) {
    //                 return getAllComments(responseData.paging.next, commentsData, ++iteration);
    //             }

    //             return commentsData;
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching comments: ", error);
    //             setLoadingComments(false);
    //             return [];
    //         });
    // };


    const onClick = (e) => {

        setCurrent(e.key);
        if (e.key === "ai" ) {
            // commentsAnalyser(commentsData);
            
        }
    };



    return (
        <>
            <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
                <div className="md:flex justify-between items-center mb-12">
                    <div>
                        <h2 className="md:text-4xl text-3xl font-extrabold text-gray-800">
                            <span className="underline">{userData?.instagramUsername}</span> Account
                        </h2>
                    </div>
                    <div className="pt-2 md:pt-0">
                        <p>Account balance: <span className="font-bold">$ {userData?.balance}</span></p>
                    </div>
                </div>
                <div>
                    <div className="mb-6">
                        {!loading ? <button onClick={() => getUserMedia()} className="flex justify-center gap-2 bg-primary hover:bg-hover text-white hero py-2 px-4 rounded-lg min-w-[220px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>

                            <p>Sync Instagram posts</p>
                        </button> :
                            <button className="flex justify-center gap-2 bg-primary hover:bg-hover text-white hero py-2 px-4 rounded-lg min-w-[220px]">
                                <div className="animate-spin" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </div>
                            </button>}
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
                    {
                        mediaData?.data?.map((media, index) => {
                            return (
                                <div key={index} onClick={() => showModal(media)} className="bg-white rounded-2xl  cursor-pointer hover:-translate-y-2 transition-all relative">

                                    <div className="h-[250px] overflow-hidden mx-auto aspect-w-16 rounded-t-2xl md:mb-2 mb-4">
                                        {media?.media_type === "IMAGE" || media?.media_type === "CAROUSEL_ALBUM" ?
                                            <img src={media?.media_url} alt="post" className="h-full w-full object-cover" />
                                            :
                                            <video controls className="h-full w-full object-cover">
                                                <source src={media?.media_url} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        }
                                    </div>

                                    <div className="px-4 pb-4">
                                        <h3 className="text-lg font-extrabold text-gray-800">{media?.media_type}</h3>
                                        <p className="text-gray-600 text-sm mt-2">{media?.caption}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {mediaData?.data?.length &&
                    <div className="flex justify-center gap-4 mt-4">
                        {!preLoading ? <button onClick={() => getUserMedia(mediaData?.paging?.previous, "pre")} disabled={mediaData?.paging?.previous ? false : true} className="flex justify-center gap-1 bg-primary hover:bg-hover disabled:cursor-not-allowed disabled:bg-light text-white rounded-lg items-center px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            <p>Pre</p>
                        </button> :
                            <button className="flex justify-center gap-1 bg-primary hover:bg-hover disabled:cursor-not-allowed disabled:bg-light text-white rounded-lg items-center px-4 py-2">
                                <div className="animate-spin" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </div>
                            </button>
                        }
                        {!nextLoading ? <button onClick={() => getUserMedia(mediaData?.paging?.next, "next")} disabled={mediaData?.paging?.next ? false : true} className="flex justify-center gap-1 bg-primary hover:bg-hover disabled:cursor-not-allowed disabled:bg-light text-white rounded-lg items-center px-4 py-2">
                            <p>Next</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button> :
                            <button className="flex justify-center gap-1 bg-primary hover:bg-hover disabled:cursor-not-allowed disabled:bg-light text-white rounded-lg items-center px-4 py-2">
                                <div className="animate-spin" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </div>
                            </button>
                        }
                    </div>
                }

                {!mediaData?.data?.length && <Empty text="There’s no posts here" />}

            </div>

            {selectedPost && <Modal
                title={
                    <>
                        {!loadingComments ? <button onClick={() => getPostComments(null, selectedPost?.id, null)} className="flex justify-center gap-2 bg-primary hover:bg-hover text-white hero py-2 px-4 rounded-lg min-w-[220px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>

                            <p>Sync post&apos;s comments</p>
                        </button> :
                            <button className="flex justify-center gap-2 bg-primary hover:bg-hover text-white hero py-2 px-4 rounded-lg min-w-[220px]">
                                <div className="animate-spin" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </div>
                            </button>}
                    </>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={900}
            >
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                itemBg: 'transparent',
                                horizontalItemSelectedColor: '#7200A7',
                            }
                        }
                    }}
                >
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                </ConfigProvider>



                {current === 'manual' && <>
                    {!!commentsData?.data?.length && <div className="mt-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Comment
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Timestamp
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {commentsData?.data?.map((comment, index) => {
                                    return (

                                        <tr key={index} className="bg-white border-b">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {comment?.text}
                                            </th>
                                            <td className="px-6 py-4">
                                                {comment?.timestamp}
                                            </td>
                                            <td className="px-6 py-4">
                                                {!deleteLoading ?
                                                    <p onClick={() => deleteComment(comment?.id)} className=" text-red-600 hover:text-red-700 hover:font-bold hover:cursor-pointer">Delete</p> :
                                                    <div className="w-fit">
                                                        <div className="animate-spin">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                            </svg>
                                                        </div>

                                                    </div>}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>}

                    {!!commentsData?.data?.length &&
                        <div className="flex justify-center gap-4 mt-4">
                            {!preLoadingComments ? <button onClick={() => getPostComments(commentsData?.paging?.previous, selectedPost?.id, "pre")} disabled={commentsData?.paging?.previous ? false : true} className="flex justify-center gap-1 bg-primary hover:bg-hover disabled:cursor-not-allowed disabled:bg-light text-white rounded-lg items-center px-4 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                                <p>Pre</p>
                            </button> :
                                <button className="flex justify-center gap-1 bg-primary hover:bg-hover disabled:cursor-not-allowed disabled:bg-light text-white rounded-lg items-center px-4 py-2">
                                    <div className="animate-spin" >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    </div>
                                </button>
                            }
                            {!nextLoadingComments ? <button onClick={() => getPostComments(commentsData?.paging?.next, selectedPost?.id, "next")} disabled={commentsData?.paging?.next ? false : true} className="flex justify-center gap-1 bg-primary hover:bg-hover disabled:cursor-not-allowed disabled:bg-light text-white rounded-lg items-center px-4 py-2">
                                <p>Next</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </button> :
                                <button className="flex justify-center gap-1 bg-primary hover:bg-hover disabled:cursor-not-allowed disabled:bg-light text-white rounded-lg items-center px-4 py-2">
                                    <div className="animate-spin" >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    </div>
                                </button>
                            }
                        </div>
                    }
                    {!commentsData?.data?.length && <Empty text="There’s no comments here" />}

                </>}

                {current === 'ai' && <>
                    {/* {loadingAi && <>

                        <div className="animate-spin">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </div>
                    </>} */}



                    {<Empty text="There’s no moderated comments here" />}
                </>}




            </Modal>}
        </>

    );
};