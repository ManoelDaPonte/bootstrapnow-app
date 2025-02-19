//components/abonnement/NoticeBox.tsx
import { Sparkles } from "lucide-react";

export default function NoticeBox() {
	return (
		<div className="border border-border bg-card p-4 rounded-md flex items-start space-x-4 shadow">
			<Sparkles className="text-primary h-6 w-6 mt-1" />
			<div>
				<h2 className="font-semibold text-lg">
					Devenez bêta testeur !
				</h2>
				<p className="text-sm text-muted-foreground">
					Smart-Hunter et Market-Tester sont en phase de
					développement. Rejoignez-nous dans leur évolution et
					bénéficiez d&apos;un accès privilégié pour façonner leur
					futur.
				</p>
			</div>
		</div>
	);
}
