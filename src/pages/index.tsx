"use client"

import React from "react";
import Layout from "../components/Layout";
import { Button } from "~/components/ui/button"
import { ArrowRight, User } from "lucide-react";
import Image from "next/image";

export default function Home() {

    return (
        <Layout>
            <div className="flex flex-col items-center">
                {/* Container */}
                <div className="w-[512px] h-[512px] max-w-full max-h-full relative mb-4">
                    {/* Image */}
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/homepageMascot.png"
                            alt="Mascot"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between">
                        <Button type="button" variant="outline" className="flex items-center" disabled>
                            <User size={24} className="mr-2" />
                            Sign In
                        </Button>

                        <a href="/create">
                            <Button type="button" className="flex items-center">
                                Create Your Character
                                <ArrowRight size={24} className="ml-2" />
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 flex items-center">

                <p className="text-gray-600">
                    ℹ️ See my <a href="https://github.com/nadiaenh/charanari">  GitHub </a> for upcoming features and weekly progress !
                </p>
            </div>
        </Layout>
    );
}