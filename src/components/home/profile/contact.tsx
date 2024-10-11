import { Mail } from "lucide-react";

interface ContactProps {
	email: string;
}

export default function Contact({ email }: ContactProps) {
	return (
		<a className="flex w-full justify-center" href={"mailto:" + email}>
			<button className="button-style button-transition group h-14 w-full animate-pulse rounded-full hover:scale-105 hover:animate-none hover:bg-primary-600 hover:shadow-[0px_0px_15px_1px_#09de79] hover:max-lg:mb-2 md:w-[90%] lg:w-2/3 xl:w-1/2">
				<div className="flex items-center justify-center space-x-2 text-secondary-200">
					<Mail className="button-transition group-hover:stroke-black" size={24} />
					<span className="button-transition select-none text-base font-medium group-hover:text-black lg:text-lg">Contacto</span>
				</div>
			</button>
		</a>
	);
}
