import React from 'react'

export default function HowItWorks() {
    return (
        <div className="grid md:grid-cols-3 gap-6 min-h-[164px] mt-8 py-8 p-16 bg-gradient-to-r from-hover to-light overflow-hidden">
            <div className="md:col-span-2">
                <h1 className="text-3xl font-bold text-white">Welcome to Purgepost!</h1>
                <p className="text-gray-200 mt-4 mb-8">A  platform designed to help you maintain a positive and clean comment section on your Instagram posts. By leveraging AI, PurgePost automatically identifies negative or harmful comments on your Instagram posts and allows you to delete these comments with a single click.</p>

                <a href="https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1702414913944234&redirect_uri=https://purgepost-front.vercel.app/application/home&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish" target='_blank' className="py-3 px-6 text-sm font-semibold bg-white text-primary hover:bg-slate-100 rounded-md">
                    Get Started
                </a>
            </div>

            <div className="relative max-md:hidden">
                <img src="/application/home/Instagram Profile.png" alt="Banner Image"
                    className="w-3/4 right-8 top-[-10px] md:absolute skew-x-[-16deg] rotate-2 object-cover" />
            </div>
        </div>
    )
}
