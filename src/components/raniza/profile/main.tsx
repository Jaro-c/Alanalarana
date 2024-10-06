import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Contact = dynamic(() => import("@/components/home/profile/contact"));

export default function Profile() {
	const Title = process.env.PG_R_Title;
	const Description = process.env.PG_R_Description;
	const Email = process.env.PG_R_Mail as string;

	const Title_Alanalarana = process.env.PG_H_Title;

	return (
		<div className="flex h-full flex-col items-center justify-center space-y-4">
			<div className="flex w-full flex-col items-center space-y-4">
				<div className="relative flex items-center justify-center">
					<Image className="no-select h-auto w-36 rounded-full lg:w-40" src={"/raniza/profile.webp"} width={150} height={150} alt={Title + " - Logo"} />

					<Link href="/" className="group absolute -left-24 lg:-left-28">
						<div className="button-transition rounded-full group-hover:scale-105 group-hover:shadow-[0px_0px_15px_1px_#09de79]">
							<Image className="no-select h-auto w-16 rounded-full lg:w-20" src={"/home/profile.webp"} width={100} height={100} alt={Title_Alanalarana + " - Logo"} />
						</div>
					</Link>
				</div>

				<div className="flex w-full flex-col items-center text-secondary-200">
					<h1 className="text-xl font-bold md:text-2xl xl:text-3xl">{Title}</h1>
					<span className="text-lg opacity-50 lg:text-xl">{Description}</span>
				</div>
			</div>

			<Contact email={Email} />
		</div>
	);
}
