'use client';
import Posts from '@/components/Posts';
import { ConfigProvider, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, DollarOutlined, HomeOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import HowItWorks from '@/components/HowItWorks';
import { getCookie, sendGetRequest, sendPostRequest } from '@/functions/utilities';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [current, setCurrent] = useState('home');
  const router = useRouter();

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
  ];

  const balance = 100;

  useEffect(() => {
    if (!isLoggesIn()) {
      router.push("/login");
    }
    // check if the url has the code parameter
    // const urlParams = new URLSearchParams(window.location.search);
    const urlParams = router.query;
    const code = urlParams.code;
    if (code) {
      console.log("Code:", code);
      const body = { 
        code: code, 
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: "https://purgepost-front.vercel.app/",
      };
      const url = "https://api.instagram.com/oauth/access_token";
      let authRes = sendPostRequest(url, body);
      let accessToken = authRes.access_token;
      let userId = authRes.user_id;
      let clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
      if (authRes) {
        let getUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${accessToken}`;
        let longTokenRes = sendGetRequest(getUrl)
        let longLivedToken = longTokenRes.access_token;
        let expiresIn = longTokenRes.expires_in;
        let tokenType = longTokenRes.token_type;
        async () => {
          const userPurgeId = getCookie("uid");
          await setDoc(doc(db, 'users', userPurgeId), {
            instagramToken: longLivedToken,
            instagramUserId: userId,
            instagramTokenExpiresIn: expiresIn,
            tokenType: tokenType
          });
        }
      }
    }

  }, [])

  const isLoggesIn = () => {
    let loggedIn = getCookie("accessToken") ? true : false;
    return loggedIn;
  }

  return (
    <div>

      {/* <Posts /> */}

      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

      {current === 'home' && <>
        {getCookie("instagramToken") ?
          <Posts /> :
          <HowItWorks />
        }
      </>}

    </div>

  );
};