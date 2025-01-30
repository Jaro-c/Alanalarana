"use client";

import Image from "next/image";

interface VideoProps {
	id: string;
	title: string;
	image: string;
	newVideo: boolean;
}

export default function Video({ id, title, image, newVideo }: VideoProps) {
	return (
		<div onClick={() => window.open("https://youtu.be/" + id, "_blank", "noopener")} className="group flex w-full flex-col gap-2">
			<span className="select-none truncate text-sm text-secondary-200/80 lg:text-base">{title}</span>

			<div className="relative aspect-video max-w-full">
				<Image className="absolute inset-0 max-h-full w-full select-none rounded-lg object-contain" src={image} alt={title} priority width={400} height={400} />

				<div className="absolute inset-0 flex items-center justify-center">
					<svg
						className="button-transition h-auto w-12 fill-gray-light/50 group-hover:scale-110 md:w-16"
						viewBox="0 0 36 36"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
					>
						<path d="M32.16,16.08,8.94,4.47A2.07,2.07,0,0,0,6,6.32V29.53a2.06,2.06,0,0,0,3,1.85L32.16,19.77a2.07,2.07,0,0,0,0-3.7Z" />
						<rect x="0" y="0" width="36" height="36" fill="none" />
					</svg>
				</div>

				{newVideo && (
					<div className="absolute bottom-4 right-4 animate-pulse rounded-full bg-red px-3 py-0.5">
						<span className="select-none text-xs font-medium text-secondary-200 lg:text-sm">Nuevo</span>
					</div>
				)}
			</div>
		</div>
	);
}
