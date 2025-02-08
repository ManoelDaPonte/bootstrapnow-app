// types/shared/card-modal.ts

export interface BaseCard {
	id: number;
	title: string;
	description: string;
}
export interface DetailedDescription {
	title: string;
	content: string;
	examples: string[];
}

export interface ModalProps<T extends BaseCard = BaseCard> {
	isOpen: boolean;
	onClose: () => void;
	card: T;
	onSave: () => void;
	onDelete: () => void;
	error: boolean;
	isNew?: boolean;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	modalTitle?: string;
	titlePlaceholder?: string;
	descriptionPlaceholder?: string;
	categoryDescription?: DetailedDescription;
}
