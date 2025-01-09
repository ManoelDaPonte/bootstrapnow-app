// components/ui/InputField.tsx
import React, { forwardRef } from "react";

interface InputFieldProps {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	error?: boolean;
	type?: "text" | "textarea";
}

type Ref = HTMLInputElement | HTMLTextAreaElement;

const InputField = forwardRef<Ref, InputFieldProps>(
	(
		{
			id,
			label,
			value,
			onChange,
			placeholder,
			error = false,
			type = "text",
		},
		ref
	) => {
		const handleChange = (
			e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
		) => {
			onChange(e.target.value);
		};

		return (
			<div className="mb-4">
				<label
					htmlFor={id}
					className="block text-sm font-medium text-gray-700"
				>
					{label}
				</label>
				{type === "textarea" ? (
					<textarea
						id={id}
						ref={ref as React.Ref<HTMLTextAreaElement>}
						value={value}
						onChange={handleChange}
						placeholder={placeholder}
						className={`mt-1 block w-full shadow-sm sm:text-sm border ${
							error ? "border-red-500" : "border-gray-300"
						} rounded-md`}
					/>
				) : (
					<input
						type="text"
						id={id}
						ref={ref as React.Ref<HTMLInputElement>}
						value={value}
						onChange={handleChange}
						placeholder={placeholder}
						className={`mt-1 block w-full shadow-sm sm:text-sm border ${
							error ? "border-red-500" : "border-gray-300"
						} rounded-md`}
					/>
				)}
				{error && (
					<p className="mt-1 text-sm text-red-600">
						Ce champ est requis.
					</p>
				)}
			</div>
		);
	}
);

InputField.displayName = "InputField";

export default InputField;
