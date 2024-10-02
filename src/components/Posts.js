import { getCookie, sendGetRequest } from '@/functions/utilities';
import React from 'react';

export default function Posts() {

    const getInstagramAccessToken = async () => {
        let instagramAccessToken = getCookie("instagramToken");
        let instagramUserId = getCookie("instagramUserId") || "17841468202953374";
        let instagramUsername = getCookie("instagramUsername") || "koole.rjo";

        let reqUrl = `https://graph.facebook.com/v20.0/${instagramUserId}?fields=business_discovery.username(${instagramUsername}){{followers_count,media_count,media}}&access_token=${instagramAccessToken}`;
        let instaRes = sendGetRequest(reqUrl);
        console.log(instaRes)
    }
    return (
        <div className="">
            <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-12" onClick={() => getInstagramAccessToken()}>Instagram Posts</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
                    <div className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">

                        <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                            <img src="https://readymadeui.com/images/product9.webp" alt="Product 1"
                                className="h-full w-full object-contain" />
                        </div>

                        <div>
                            <h3 className="text-lg font-extrabold text-gray-800">Sole Elegance</h3>
                            <p className="text-gray-600 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">

                        <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                            <img src="https://readymadeui.com/images/product10.webp" alt="Product 2"
                                className="h-full w-full object-contain" />
                        </div>

                        <div>
                            <h3 className="text-lg font-extrabold text-gray-800">Urban Sneakers</h3>
                            <p className="text-gray-600 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">

                        <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                            <img src="https://readymadeui.com/images/product11.webp" alt="Product 3"
                                className="h-full w-full object-contain" />
                        </div>

                        <div>
                            <h3 className="text-lg font-extrabold text-gray-800">Velvet Boots</h3>
                            <p className="text-gray-600 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">

                        <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                            <img src="https://readymadeui.com/images/product12.webp" alt="Product 3"
                                className="h-full w-full object-contain" />
                        </div>

                        <div>
                            <h3 className="text-lg font-extrabold text-gray-800">Summit Hiking</h3>
                            <p className="text-gray-600 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">

                        <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                            <img src="https://readymadeui.com/images/product13.webp" alt="Product 3"
                                className="h-full w-full object-contain" />
                        </div>

                        <div>
                            <h3 className="text-lg font-extrabold text-gray-800">Zenith Glow</h3>
                            <p className="text-gray-600 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">

                        <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                            <img src="https://readymadeui.com/images/product14.webp" alt="Product 3"
                                className="h-full w-full object-contain" />
                        </div>

                        <div>
                            <h3 className="text-lg font-extrabold text-gray-800">Echo Elegance</h3>
                            <p className="text-gray-600 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">

                        <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                            <img src="https://readymadeui.com/images/product15.webp" alt="Product 3"
                                className="h-full w-full object-contain" />
                        </div>

                        <div>
                            <h3 className="text-lg font-extrabold text-gray-800">Pumps</h3>
                            <p className="text-gray-600 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">

                        <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                            <img src="https://readymadeui.com/images/product10.webp" alt="Product 3"
                                className="h-full w-full object-contain" />
                        </div>

                        <div>
                            <h3 className="text-lg font-extrabold text-gray-800">Blaze Burst</h3>
                            <p className="text-gray-600 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};