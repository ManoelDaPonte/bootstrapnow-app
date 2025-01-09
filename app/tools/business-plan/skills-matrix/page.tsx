export default function Home() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				fontSize: "2rem",
			}}
		>
			Home
		</div>
	);
}

// // app/tools/business-plan/skills-matrix/page.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import {
// 	levels,
// 	initialDomains,
// 	initialTeamMembers,
// 	descriptionContent,
// 	skillMatrixSections,
// } from "@/lib/config/configSkillMatrix";
// import { TeamMember, ModalState, Card } from "@/lib/config/types";
// import CardItem from "@/components/business-plan/ui/CardItem";
// import ModalForm from "@/components/business-plan/ui/ModalForm";
// import { FaInfoCircle, FaEdit } from "react-icons/fa";

// const SkillsMatrix: React.FC = () => {
// 	// État pour stocker les membres de l'équipe
// 	const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
// 		const saved = localStorage.getItem("teamMembers");
// 		return saved ? JSON.parse(saved) : initialTeamMembers;
// 	});

// 	// État pour les domaines de compétence
// 	const [domains, setDomains] = useState<string[]>(() => {
// 		const saved = localStorage.getItem("domains");
// 		return saved ? JSON.parse(saved) : initialDomains;
// 	});

// 	// État pour la modale (ajouter/éditer membre)
// 	const [modalState, setModalState] = useState<ModalState>({
// 		open: false,
// 		sectionId: null,
// 		selectedCard: null,
// 	});

// 	// États pour les champs du formulaire
// 	const [newName, setNewName] = useState("");
// 	const [newRole, setNewRole] = useState("");

// 	// État pour les erreurs de formulaire
// 	const [formError, setFormError] = useState(false);

// 	// États pour l'ajout d'un nouveau domaine
// 	const [isAddDomainModalOpen, setIsAddDomainModalOpen] = useState(false);
// 	const [newDomainTitle, setNewDomainTitle] = useState("");

// 	useEffect(() => {
// 		localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
// 		localStorage.setItem("domains", JSON.stringify(domains));
// 	}, [teamMembers, domains]);

// 	/**
// 	 * Ouvre la modale pour ajouter ou éditer un membre
// 	 */
// 	const openModal = (sectionId: string, member: TeamMember | null = null) => {
// 		const selectedCard: Card | null = member
// 			? { id: member.id, title: member.name, description: member.role }
// 			: null;
// 		setModalState({ open: true, sectionId, selectedCard });
// 		setNewName(member?.name || "");
// 		setNewRole(member?.role || "");
// 		setFormError(false);
// 	};

// 	/**
// 	 * Ferme la modale et réinitialise les états
// 	 */
// 	const closeModal = () => {
// 		setModalState({ open: false, sectionId: null, selectedCard: null });
// 		setNewName("");
// 		setNewRole("");
// 		setFormError(false);
// 	};

// 	/**
// 	 * Sauvegarde un membre (création ou édition)
// 	 */
// 	const saveMember = () => {
// 		if (!newName.trim() || !newRole.trim()) {
// 			setFormError(true);
// 			return;
// 		}

// 		const { sectionId, selectedCard } = modalState;
// 		if (!sectionId) return;

// 		if (selectedCard) {
// 			// Édition
// 			setTeamMembers((prev) =>
// 				prev.map((member) =>
// 					member.id === selectedCard.id
// 						? { ...member, name: newName, role: newRole }
// 						: member
// 				)
// 			);
// 		} else {
// 			// Création
// 			const newMember: TeamMember = {
// 				id: Date.now().toString(),
// 				name: newName,
// 				role: newRole,
// 				skills: domains.reduce(
// 					(acc, domain) => ({ ...acc, [domain]: "" }),
// 					{}
// 				),
// 			};
// 			setTeamMembers((prev) => [newMember, ...prev]);
// 		}

// 		closeModal();
// 	};

// 	/**
// 	 * Supprime un membre
// 	 */
// 	const deleteMember = () => {
// 		const { sectionId, selectedCard } = modalState;
// 		if (!sectionId || !selectedCard) return;

// 		setTeamMembers((prev) =>
// 			prev.filter((member) => member.id !== selectedCard.id)
// 		);

// 		closeModal();
// 	};

// 	/**
// 	 * Ajout d'un nouveau domaine
// 	 */
// 	const handleAddDomain = () => {
// 		setIsAddDomainModalOpen(true);
// 	};

// 	const confirmAddDomain = () => {
// 		if (newDomainTitle.trim() && !domains.includes(newDomainTitle)) {
// 			setDomains([...domains, newDomainTitle]);
// 			// Ajouter la nouvelle compétence à chaque membre
// 			setTeamMembers((prev) =>
// 				prev.map((member) => ({
// 					...member,
// 					skills: { ...member.skills, [newDomainTitle]: "" },
// 				}))
// 			);
// 		}
// 		setNewDomainTitle("");
// 		setIsAddDomainModalOpen(false);
// 	};

// 	/**
// 	 * Gestion de la modification des compétences
// 	 */
// 	const handleSkillChange = (
// 		memberId: string,
// 		domain: string,
// 		level: string
// 	) => {
// 		setTeamMembers((prev) =>
// 			prev.map((member) =>
// 				member.id === memberId
// 					? {
// 							...member,
// 							skills: { ...member.skills, [domain]: level },
// 					  }
// 					: member
// 			)
// 		);
// 	};

// 	/**
// 	 * Exporter en CSV
// 	 */
// 	const exportToCSV = () => {
// 		const headers = ["Nom", "Rôle", ...domains];
// 		const csvRows = [headers.join(",")];

// 		teamMembers.forEach((member) => {
// 			const row = [
// 				member.name,
// 				member.role,
// 				...domains.map((domain) => member.skills[domain] || ""),
// 			];
// 			csvRows.push(row.join(","));
// 		});

// 		const csvContent = csvRows.join("\n");
// 		const blob = new Blob([csvContent], { type: "text/csv" });
// 		const url = window.URL.createObjectURL(blob);
// 		const a = document.createElement("a");
// 		a.href = url;
// 		a.download = "skills-matrix.csv";
// 		document.body.appendChild(a);
// 		a.click();
// 		document.body.removeChild(a);
// 		window.URL.revokeObjectURL(url);
// 	};

// 	return (
// 		<div className="page-container p-4">
// 			{/* Contenu principal */}
// 			<div className="main-content">
// 				<div className="header flex justify-between items-center mb-6">
// 					<h1 className="text-2xl font-bold">
// 						Matrice des compétences des membres de l'équipe
// 					</h1>
// 					<div
// 						className="info-icon-skillmatrix cursor-pointer"
// 						onClick={() => setIsAddDomainModalOpen(true)} // Ou ouvrir une info modal si nécessaire
// 					>
// 						<FaInfoCircle size={24} />
// 					</div>
// 				</div>

// 				{/* Boutons d'exportation et d'ajout */}
// 				<div className="flex justify-between items-center mb-4">
// 					<button
// 						onClick={exportToCSV}
// 						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// 					>
// 						Exporter en CSV
// 					</button>
// 					<button
// 						onClick={handleAddDomain}
// 						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// 					>
// 						+ Ajouter un domaine
// 					</button>
// 				</div>

// 				{/* Tableau des compétences */}
// 				<div className="table-container overflow-auto">
// 					<table className="min-w-full bg-white border">
// 						<thead>
// 							<tr>
// 								<th className="px-4 py-2 border">Membre</th>
// 								<th className="px-4 py-2 border">Rôle</th>
// 								{domains.map((domain) => (
// 									<th
// 										key={domain}
// 										className="px-4 py-2 border"
// 									>
// 										{domain}
// 										<div className="flex justify-end mt-1">
// 											{/* Vous pouvez implémenter des actions supplémentaires ici si nécessaire */}
// 											{/* Par exemple, modifier ou supprimer un domaine */}
// 										</div>
// 									</th>
// 								))}
// 								<th className="px-4 py-2 border">Actions</th>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							{teamMembers.map((member) => (
// 								<tr key={member.id}>
// 									<td className="px-4 py-2 border">
// 										<div className="flex items-center">
// 											<span>{member.name}</span>
// 											<FaEdit
// 												className="ml-2 text-gray-500 cursor-pointer"
// 												onClick={() =>
// 													openModal(
// 														"skillsMatrix",
// 														member
// 													)
// 												}
// 											/>
// 										</div>
// 									</td>
// 									<td className="px-4 py-2 border">
// 										{member.role}
// 									</td>
// 									{domains.map((domain) => (
// 										<td
// 											key={domain}
// 											className="px-4 py-2 border"
// 										>
// 											{/* Sélecteur de niveau de compétence */}
// 											<select
// 												value={
// 													member.skills[domain] || ""
// 												}
// 												onChange={(e) =>
// 													handleSkillChange(
// 														member.id,
// 														domain,
// 														e.target.value
// 													)
// 												}
// 												className="w-full p-1 border rounded"
// 												style={{
// 													backgroundColor: member
// 														.skills[domain]
// 														? levels.find(
// 																(l) =>
// 																	l.name ===
// 																	member
// 																		.skills[
// 																		domain
// 																	]
// 														  )?.color
// 														: "white",
// 													color: member.skills[domain]
// 														? "white"
// 														: "black",
// 												}}
// 											>
// 												<option value="" disabled>
// 													Niveau
// 												</option>
// 												{levels.map((level) => (
// 													<option
// 														key={level.name}
// 														value={level.name}
// 														style={{
// 															backgroundColor:
// 																level.color,
// 															color: "white",
// 														}}
// 													>
// 														{level.name}
// 													</option>
// 												))}
// 											</select>
// 										</td>
// 									))}
// 									<td className="px-4 py-2 border">
// 										<button
// 											onClick={() =>
// 												openModal(
// 													"skillsMatrix",
// 													member
// 												)
// 											}
// 											className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
// 										>
// 											Supprimer
// 										</button>
// 									</td>
// 								</tr>
// 							))}
// 						</tbody>
// 					</table>
// 					<button
// 						onClick={() => {
// 							const newMember: TeamMember = {
// 								id: Date.now().toString(),
// 								name: "Nouveau membre",
// 								role: "Nouveau rôle",
// 								skills: domains.reduce(
// 									(acc, domain) => ({ ...acc, [domain]: "" }),
// 									{}
// 								),
// 							};
// 							setTeamMembers([newMember, ...teamMembers]);
// 						}}
// 						className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
// 					>
// 						+ Ajouter un membre
// 					</button>
// 				</div>
// 			</div>

// 			{/* Modal pour ajouter/éditer un membre */}
// 			{modalState.open && (
// 				<ModalForm
// 					modalState={modalState}
// 					closeModal={closeModal}
// 					saveCard={saveMember}
// 					deleteCard={
// 						modalState.selectedCard ? deleteMember : undefined
// 					}
// 					titleValue={newName}
// 					descriptionValue={newRole}
// 					setTitle={setNewName}
// 					setDescription={setNewRole}
// 					formError={formError}
// 					detailedDescription={descriptionContent} // Assurez-vous que cela correspond à DescriptionContent
// 				/>
// 			)}

// 			{/* Modal pour ajouter un nouveau domaine */}
// 			{isAddDomainModalOpen && (
// 				<div
// 					className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
// 					onClick={() => setIsAddDomainModalOpen(false)}
// 				>
// 					<div
// 						className="bg-white rounded-md shadow-lg p-6 max-w-md w-full relative"
// 						onClick={(e) => e.stopPropagation()} // Empêche la fermeture du modal en cliquant à l'intérieur
// 					>
// 						<button
// 							onClick={() => setIsAddDomainModalOpen(false)}
// 							className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
// 						>
// 							×
// 						</button>
// 						<h2 className="text-xl font-bold mb-4">
// 							Ajouter un nouveau domaine
// 						</h2>
// 						<input
// 							type="text"
// 							className="w-full p-2 border rounded mb-4"
// 							placeholder="Nom du domaine"
// 							value={newDomainTitle}
// 							onChange={(e) => setNewDomainTitle(e.target.value)}
// 						/>
// 						<button
// 							onClick={confirmAddDomain}
// 							className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// 						>
// 							Ajouter
// 						</button>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default SkillsMatrix;
