import { Mail } from "lucide-react";

export default function Contact() {
	const email = process.env.PG_H_Mail;

	return (
		<a className="flex w-full justify-center" href={"mailto:" + email}>
			<button className="button-style button-transition group h-14 w-full rounded-full hover:bg-primary-600 hover:shadow-[0px_0px_15px_1px_#09de79] md:w-[90%] hover:md:scale-105 lg:w-2/3 xl:w-1/2">
				<div className="flex items-center justify-center space-x-2 text-secondary-200">
					<Mail className="button-transition group-hover:stroke-black" size={24} />
					<span className="button-transition select-none text-base font-medium group-hover:text-black lg:text-lg">Contacto</span>
				</div>
			</button>
		</a>
	);
}
