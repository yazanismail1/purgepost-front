import React from 'react';
import TickSign from './TickSign';
import CrossSign from './CrossSign';


export default function Pricing() {
    return (
        <div className="max-w-6xl mx-auto pt-4">
            <div className="text-center">
                <h2 className="text-gray-800 text-4xl font-bold">Pricing</h2>
            </div>
            <div className="overflow-x-auto mt-12">
                <table className="w-full border border-collapse min-w-[980px]">
                    <thead>
                        <tr>
                            <th className="p-4 text-left border max-w-[150px]">
                                <h3 className="text-gray-800 font-bold text-base whitespace-nowrap">Compare Plans</h3>
                                <p className="text-xs text-gray-500 font-medium mt-2">Choose to top-up your account based on your usage plan</p>
                            </th>
                            <th className="p-4 text-center border whitespace-nowrap max-w-[150px]">
                                <h3 className="text-gray-800 font-bold text-2xl">Free <span className="text-xs text-gray-500 font-medium">/Lifetime</span></h3>
                                <button type="button" className="w-full mt-4 px-5 py-2.5 text-xs tracking-wide font-bold bg-gray-800 hover:bg-gray-700 text-white rounded-md">Choose Plan</button>
                            </th>
                            <th className="p-4 text-center border whitespace-nowrap max-w-[150px]">
                                <h3 className="text-gray-800 font-bold text-2xl">$1.00 <span className="text-xs text-gray-500 font-medium">/One time payment</span></h3>
                                <button type="button" className="w-full mt-4 px-5 py-2.5 text-xs tracking-wide font-bold bg-gray-800 hover:bg-gray-700 text-white rounded-md">Choose Plan</button>
                            </th>
                            <th className="p-4 text-center border whitespace-nowrap max-w-[150px]">
                                <h3 className="text-gray-800 font-bold text-2xl">$5.00 <span className="text-xs text-gray-500 font-medium">/One time payment</span></h3>
                                <button type="button" className="w-full mt-4 px-5 py-2.5 text-xs tracking-wide font-bold bg-gray-800 hover:bg-gray-700 text-white rounded-md">Choose Plan</button>
                            </th>
                            <th className="p-4 text-center border whitespace-nowrap max-w-[150px]">
                                <h3 className="text-gray-800 font-bold text-2xl">$10.00 <span className="text-xs text-gray-500 font-medium">/One time payment</span></h3>
                                <button type="button" className="w-full mt-4 px-5 py-2.5 text-xs tracking-wide font-bold bg-gray-800 hover:bg-gray-700 text-white rounded-md">Choose Plan</button>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="border text-sm">
                        <tr>
                            <td className="px-4 py-3 text-gray-800 border max-w-[150px]">
                                Connecting to Instagram
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 text-gray-800 border max-w-[150px]">
                                Retrieve Posts
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 text-gray-800 border max-w-[150px]">
                                Retrieve Comments
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <CrossSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 text-gray-800 border max-w-[150px]">
                                Analysing Comments
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <CrossSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                Up to 100 comments
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                Up to 500 comments
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                Up to 1K comments
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 text-gray-800 border max-w-[150px]">
                                Include Search Words
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <CrossSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 text-gray-800 border max-w-[150px]">
                                View Analysis Results
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <CrossSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 text-gray-800 border max-w-[150px]">
                                Batch Delete Comments
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <CrossSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <TickSign />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 text-gray-800 border max-w-[150px]">
                                Delete Comments
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                <CrossSign />
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                Up to 100 comments
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                Up to 500 comments
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center border max-w-[150px]">
                                Up to 1K comments
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
};