"use client";

type RoleSelectionProps = {
	role: "visionnaire" | "developpeur" | "marketeur" | "inconnu";
	setRole: (
		role: "visionnaire" | "developpeur" | "marketeur" | "inconnu"
	) => void;
};

export default function RoleSelection({ role, setRole }: RoleSelectionProps) {
	return (
		<div>
			<h2 className="font-semibold mb-2">Quel est votre profil ?</h2>
			<div className="flex flex-col space-y-2">
				<label className="inline-flex items-center space-x-2">
					<input
						type="radio"
						name="role"
						value="visionnaire"
						checked={role === "visionnaire"}
						onChange={() => setRole("visionnaire")}
						className="radio radio-primary"
					/>
					<span>Visionnaire</span>
				</label>
				<label className="inline-flex items-center space-x-2">
					<input
						type="radio"
						name="role"
						value="developpeur"
						checked={role === "developpeur"}
						onChange={() => setRole("developpeur")}
						className="radio radio-primary"
					/>
					<span>Développeur</span>
				</label>
				<label className="inline-flex items-center space-x-2">
					<input
						type="radio"
						name="role"
						value="marketeur"
						checked={role === "marketeur"}
						onChange={() => setRole("marketeur")}
						className="radio radio-primary"
					/>
					<span>Marketeur</span>
				</label>
				<label className="inline-flex items-center space-x-2">
					<input
						type="radio"
						name="role"
						value="inconnu"
						checked={role === "inconnu"}
						onChange={() => setRole("inconnu")}
						className="radio radio-primary"
					/>
					<span>Je ne sais pas encore</span>
				</label>
			</div>
		</div>
	);
}
