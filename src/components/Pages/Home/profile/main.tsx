import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Contact = dynamic(() => import("./contact"));

export default function Profile() {
	const Title = process.env.PG_H_Title;
	const Description = process.env.PG_H_Description;
	const Email = process.env.PG_H_Mail as string;

	const Title_Raniza = process.env.PG_R_Title;

	return (
		<div className="flex size-full flex-col items-center justify-center gap-4">
			<div className="flex w-full flex-col items-center gap-4">
				<div className="relative flex items-center justify-center">
					<Image className="size-36 select-none rounded-full lg:size-40" src={"/assets/pages/home/profile.webp"} width={150} height={150} priority alt={Title + " - Logo"} />

					<Link href="/raniza" className="group absolute -right-24 lg:-right-28">
						<div className="button-transition rounded-full group-hover:scale-105 group-hover:shadow-[0px_0px_15px_1px_#09de79]">
							<Image className="size-16 select-none rounded-full lg:size-20" src={"/assets/pages/raniza/profile.webp"} width={100} height={100} priority alt={Title_Raniza + " - Logo"} />
						</div>
					</Link>
				</div>

				<div className="flex w-full flex-col items-center text-secondary-200">
					<h1 className="text-xl font-bold md:text-2xl xl:text-3xl">{Title}</h1>
					<p className="text-lg opacity-50 lg:text-xl">{Description}</p>
				</div>
			</div>

			<Contact email={Email} />
		</div>
	);
}
