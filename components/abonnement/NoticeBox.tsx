import { AlertTriangle } from "lucide-react";

export default function NoticeBox() {
	return (
		<div className="border border-border bg-card p-4 rounded-md flex items-start space-x-4 shadow">
			<AlertTriangle className="text-orange-500 h-6 w-6 mt-1" />
			<div>
				<h2 className="font-semibold text-lg">Attention</h2>
				<p className="text-sm text-muted-foreground">
					Les produits Search-Hunter et Market-Tester ne sont pas
					encore finalisés. Veuillez en tenir compte avant de passer
					au paiement.
				</p>
			</div>
		</div>
	);
}
