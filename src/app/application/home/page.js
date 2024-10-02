'use client';
import Posts from '@/components/Posts';
import { ConfigProvider, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, BankOutlined, DollarOutlined, HomeOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import HowItWorks from '@/components/HowItWorks';
import { getCookie, sendGetRequest, sendPostRequest, setCookie } from '@/functions/utilities';
import { useRouter, useSearchParams } from 'next/navigation';
import Pricing from '@/components/Pricing';


export default function Home() {
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
    // check if the url has the code parameter
    // const urlParams = new URLSearchParams(window.location.search);
    const urlParams = router?.query;
    let code = searchParams.get('code');
    console.log("Code:", code);
    if (code) {
      code = code.slice(0, -2);
    }

    // remove the last two characters from the code variable

    if (code) {
      console.log("Code:", code);

      let exchangeToken = exchangeCodeForToken(code);

      if (exchangeToken?.statusCode !== 400) {
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
    let userData = sendGetRequest(`https://graph.instagram.com/v12.0/me?fields=user_id,username&access_token=${accessToken}`);
    let responseObject = {
      userId: userData?.data[0]?.user_id,
      username: userData?.data[0]?.username,
    };
    return responseObject;
  };

  const getLongLiveToken = (accessToken) => {
    const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
    let getUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_CLIENT_SECRET}&access_token=${accessToken}`;
    let longTokenRes = sendGetRequest(getUrl)
    let response = {
      longLivedToken: longTokenRes?.access_token,
      expiresIn: longTokenRes?.expires_in,
      tokenType: longTokenRes?.token_type,
    };
    return response;
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
    let authRes = sendPostRequest(url, body);
    let response = {
      statusCode: authRes?.code,
      accessToken: authRes?.data[0]?.access_token,
      userId: authRes?.data[0]?.user_id,
    };
    return response;
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
      { current === 'pricing' && <Pricing />

      }

    </div>

  );
};