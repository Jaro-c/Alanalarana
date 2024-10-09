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
		<div onClick={() => window.open("https://youtu.be/" + id, "_blank", "noopener")} className="button-transition flex w-full flex-col space-y-2 hover:scale-95">
			<span className="select-none truncate text-sm text-secondary-200/90 lg:text-base">{title}</span>

			<div className="relative w-full">
				<Image className="no-select h-auto w-full rounded-lg" src={image} alt={title + " Video"} width={400} height={400} />

				{newVideo && (
					<div className="absolute bottom-4 right-4 animate-pulse rounded-full bg-red px-2 py-0.5">
						<span className="select-none text-xs font-medium text-secondary-200 lg:text-sm">Nuevo</span>
					</div>
				)}
			</div>
		</div>
	);
}
