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


export default function HomePage() {
    const [current, setCurrent] = useState('home');
    const router = useRouter();
    const searchParams = useSearchParams();

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

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
        },
        {
            label: `Account Balance: $${getCookie("balance") || 0}`,
            key: '',
            icon: <BankOutlined />,
            disabled: true,
        },
    ];

    const balance = 100;

    useEffect(() => {
        if (!isLoggesIn()) {
            router.push("/login");
        }

        let code = searchParams.get('code');
        console.log("Outside If statement code:", code);
        if (code) {

            let exchangeToken = exchangeCodeForToken(code);
            console.log("exchangeToken func", exchangeToken)
            if (exchangeToken) {
                let longLiveTokenData = getLongLiveToken(exchangeToken?.accessToken);
                if (longLiveTokenData) {
                    let instagramUser = getInstagramUserName(longLiveTokenData?.longLivedToken);
                    async () => {
                        const userPurgeId = getCookie("uid");
                        await setDoc(doc(db, 'users', userPurgeId), {
                            instagramToken: longLiveTokenData?.longLivedToken,
                            instagramUserId: instagramUser?.userId,
                            instagramUsername: instagramUser?.username,
                            instagramTokenExpiresIn: longLiveTokenData?.expiresIn,
                            tokenType: longLiveTokenData?.tokenType
                        });
                    };

                    setCookie("instagramToken", longLiveTokenData?.longLivedToken);
                    setCookie("instagramUserId", instagramUser?.userId);
                    setCookie("instagramUsername", instagramUser?.username);
                    setCookie("instagramTokenExpiresIn", longLiveTokenData?.expiresIn);
                    setCookie("tokenType", longLiveTokenData?.tokenType);

                };
            };
        };
    }, [])

    const getInstagramUserName = (accessToken) => {
        let userDataUrl = `https://graph.instagram.com/v12.0/me?fields=user_id,username&access_token=${accessToken}`;
        let reqBody = { 
            url: userDataUrl, 
            body: null, 
            type: "GET" 
        }
        axios.post('/api/instagram', reqBody).then((res) => {
            let userData = res.data
            let responseObject = {
                userId: userData?.data?.user_id,
                username: userData?.data?.username,
            };
            console.log("getInstagramUserName", responseObject);
            return responseObject;
        }).catch((err) => {
            console.log(err);
            return null;
        })
    };

    const getLongLiveToken = (accessToken) => {
        const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
        let getUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_CLIENT_SECRET}&access_token=${accessToken}`;
        let reqBody = { 
            url: getUrl, 
            body: null, 
            type: "GET" 
        }
        axios.get('/api/instagram', reqBody).then((res) => {
            let longTokenRes = res.data;
            let response = {
                longLivedToken: longTokenRes?.access_token,
                expiresIn: longTokenRes?.expires_in,
                tokenType: longTokenRes?.token_type,
            };
            console.log("getLongLiveToken", response);
    
            return response;
        }).catch((err) => {
            console.error(err);
            return null;
        });
    };

    const exchangeCodeForToken = (code) => {
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

        axios.post('/api/instagram', constructedBody)
        .then((res) => {
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
                        tokenType: longTokenRes?.token_type
                    }).then(() => {
                        console.log("Document successfully written!");
                    }).catch((error) => {
                        console.error("Error writing document: ", error);
                    });

                    setCookie("instagramToken", longTokenRes?.access_token);
                    setCookie("instagramUserId", userData?.user_id);
                    setCookie("instagramUsername", userData?.username);
                    setCookie("instagramTokenExpiresIn", longTokenRes?.expires_in);
                    setCookie("tokenType", longTokenRes?.token_type);


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

                <HowItWorks />
                {/* {getCookie("instagramToken") ?
          <Posts /> :
          <HowItWorks />
        } */}
            </>}
            {current === 'pricing' && <Pricing />

            }

        </div>
    );
};