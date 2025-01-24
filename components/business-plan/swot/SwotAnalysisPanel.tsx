// components/business-plan/swot/SwotAnalysisPanel.tsx
import React from "react";
import { SwotAnalysis } from "@/types/swot";

interface SwotAnalysisPanelProps {
	analysisState: SwotAnalysis;
	onGenerateAnalysis: () => void;
}

export const SwotAnalysisPanel: React.FC<SwotAnalysisPanelProps> = ({
	analysisState,
	onGenerateAnalysis,
}) => {
	const { analysis, loading, error } = analysisState;

	return (
		<div className="w-1/3 p-4 bg-gray-50 border-l overflow-auto">
			{error && (
				<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
					{error}
				</div>
			)}

			{loading ? (
				<div className="flex items-center justify-center h-full">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
				</div>
			) : analysis ? (
				<div className="prose max-w-none">
					<h2 className="text-xl font-bold mb-4">
						Analyse SWOT détaillée
					</h2>
					<div className="whitespace-pre-wrap">{analysis}</div>
				</div>
			) : (
				<div className="text-gray-500 text-center mt-8">
					Cliquez sur "Générer l'analyse SWOT" pour obtenir une
					analyse détaillée
				</div>
			)}
		</div>
	);
};

export default SwotAnalysisPanel;
