'use client';
import Posts from '@/components/Posts';
import { ConfigProvider, Menu } from 'antd';
import React, { useEffect, useState, Suspense } from 'react';
import { AppstoreOutlined, BankOutlined, DollarOutlined, HomeOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import HowItWorks from '@/components/HowItWorks';
import { getCookie, sendGetRequest, sendPostRequest, setCookie } from '@/functions/utilities';
import { useRouter, useSearchParams } from 'next/navigation';
import Pricing from '@/components/Pricing';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/components/FirebaseConfig';


export default function HomePage() {
    const [current, setCurrent] = useState('home');
    const [userData, setUserData] = useState({isConnected:false});
    const router = useRouter();
    const searchParams = useSearchParams();
    const items = [
        {
            label: 'Home',
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: 'Top Up & Pricing',
            key: 'pricing',
            icon: <DollarOutlined />,
        }
    ];

    useEffect(() => {
        if (!isLoggesIn()) {
            router.push("/login");
        }

        let code = searchParams.get('code');
        if (code) {
            connectInstagram(code);
        };

        if (getCookie("isConnectedToInstagram") === "true") {
            setUserData({
                isConnected: true,
                instagramToken: getCookie("instagramToken"),
                instagramUserId: getCookie("instagramUserId"),
                instagramUsername: getCookie("instagramUsername"),
                instagramTokenExpiresIn: getCookie("instagramTokenExpiresIn"),
                tokenType: getCookie("tokenType"),
                balance: getCookie("userBalance"),
            })
        }
        
    }, [])




    const connectInstagram = (code) => {
        const body = {
            code: code,
            client_id: process.env.INSTAGRAM_CLIENT_ID,
            client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
            grant_type: "authorization_code",
            redirect_uri: "https://purgepost-front.vercel.app/application/home/",
        };

        const url = "https://api.instagram.com/oauth/access_token";
        const constructedBody = {
            url: url,
            body: body,
            type: "POST"
        }

        axios.post('/api/instagram', constructedBody).then((res) => {
            let authRes = res.data;
            let response = {
                accessToken: authRes?.access_token,
                userId: authRes?.user_id,
            };
            console.log("authRes", authRes);
            console.log("exchangeCodeForToken", response);
    
            const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
            let shortLiveTokenUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_CLIENT_SECRET}&access_token=${authRes?.access_token}`;
            let shortLiveTokenUrlreqBody = {
                url: shortLiveTokenUrl,
                body: null,
                type: "GET"
            }
            axios.post('/api/instagram', shortLiveTokenUrlreqBody).then((res) => {
                let longTokenRes = res.data;
                let response = {
                    longLivedToken: longTokenRes?.access_token,
                    expiresIn: longTokenRes?.expires_in,
                    tokenType: longTokenRes?.token_type,
                };
                console.log("getLongLiveToken", response);

                let userDataUrl = `https://graph.instagram.com/v12.0/me?fields=user_id,username&access_token=${longTokenRes?.access_token}`;
                let userDataReqBody = { 
                    url: userDataUrl, 
                    body: null, 
                    type: "GET" 
                }
                axios.post('/api/instagram', userDataReqBody).then((res) => {
                    let userData = res.data
                    let responseObject = {
                        userId: userData?.user_id,
                        username: userData?.username,
                    };
                    console.log("getInstagramUserName", responseObject);

                    const userPurgeId = getCookie("uid");
                    setDoc(doc(db, 'users', userPurgeId), {
                        instagramToken: longTokenRes?.access_token,
                        instagramUserId: userData?.user_id,
                        instagramUsername: userData?.username,
                        instagramTokenExpiresIn: longTokenRes?.expires_in,
                        tokenType: longTokenRes?.token_type,
                        isConnectedToInstagram: true,
                        userBalance: getCookie("userBalance"),
                    }).then(() => {
                        setCookie("instagramToken", longTokenRes?.access_token);
                        setCookie("instagramUserId", userData?.user_id);
                        setCookie("instagramUsername", userData?.username);
                        setCookie("instagramTokenExpiresIn", longTokenRes?.expires_in);
                        setCookie("tokenType", longTokenRes?.token_type);

                        setCookie("isConnectedToInstagram", true);

                        if (window !== undefined && window?.location?.search) {
                            const currentParams = new URLSearchParams(window?.location?.search);
                            currentParams.delete('code');
                            const newUrl = `${window?.location?.pathname}?${currentParams?.toString()}`;
                            router.replace(newUrl);
                        }

                        console.log("Document successfully written!");
                    }).catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                }).catch((err) => {
                    console.log(err);
                    return null;
                })
            }).catch((err) => {
                console.error(err);
                return null;
            });
        })
        .catch((err) => {
            console.log(err);
            return null;
        }
        );
    }

    const isLoggesIn = () => {
        let loggedIn = getCookie("accessToken") ? true : false;
        return loggedIn;
    }

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };


    return (
        <div>
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
            {current === 'home' && <>
                {userData?.isConnected ? <Posts userData={userData} /> : <HowItWorks />}
                

            </>}
            {current === 'pricing' && <Pricing />}

        </div>
    );
};