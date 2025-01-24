// components/business-plan/shared/Header.tsx
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface HeaderProps {
	title: string;
	progress: number;
}

export const Header = ({ title, progress }: HeaderProps) => {
	const { user } = useUser();

	return (
		<div className="bg-white">
			<div className="max-w-full mx-auto">
				<div className="flex items-center justify-between p-3.5">
					<div className="flex items-center gap-4">
						<Link
							href="/tools/business-plan/"
							className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
						>
							<ChevronLeft size={20} className="text-gray-600" />
						</Link>
						<h1 className="text-2xl font-bold text-gray-800">
							{title}
						</h1>
					</div>
					<div className="flex items-center gap-6 mx-16">
						<div className="flex items-center gap-2 text-sm">
							<div className="w-24 bg-gray-200 rounded-full h-2">
								<div
									className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
									style={{ width: `${progress}%` }}
								/>
							</div>
							<span className="text-gray-600">{progress}%</span>
						</div>
						{user ? (
							<span className="text-sm text-emerald-600 flex items-center gap-1">
								<div className="w-2 h-2 bg-emerald-500 rounded-full" />
								Synchronisé
							</span>
						) : (
							<span className="text-sm text-gray-500">
								Mode local
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
