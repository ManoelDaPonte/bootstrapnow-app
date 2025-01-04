"use client";

type NewsletterPreferenceProps = {
	newsletter: boolean;
	setNewsletter: (val: boolean) => void;
	commercialMails: boolean;
	setCommercialMails: (val: boolean) => void;
};

export default function NewsletterPreference({
	newsletter,
	setNewsletter,
	commercialMails,
	setCommercialMails,
}: NewsletterPreferenceProps) {
	return (
		<div>
			<h2 className="font-semibold mb-2">Préférences de communication</h2>
			<div className="flex flex-col space-y-2">
				<label className="inline-flex items-center space-x-2">
					<input
						type="checkbox"
						checked={newsletter}
						onChange={(e) => setNewsletter(e.target.checked)}
						className="checkbox checkbox-primary"
					/>
					<span>Recevoir la newsletter toutes les semaines</span>
				</label>
				<label className="inline-flex items-center space-x-2">
					<input
						type="checkbox"
						checked={commercialMails}
						onChange={(e) => setCommercialMails(e.target.checked)}
						className="checkbox checkbox-primary"
					/>
					<span>Recevoir des e-mails commerciaux</span>
				</label>
			</div>
		</div>
	);
}
