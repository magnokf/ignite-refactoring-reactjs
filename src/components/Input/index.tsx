import { useEffect, useRef, useState, useCallback } from "react";

import { useField } from "@unform/core";

import { Container } from "./styles";
import { IconBaseProps } from "react-icons";

interface InputProps {
	name: string;
	icon?: React.ComponentType<IconBaseProps>;
	placeholder?: string;
}

const Input = ({ name, icon: Icon, ...rest }: InputProps) => {

	const inputRef = useRef<HTMLInputElement>(null);

	const { fieldName, defaultValue, error, registerField } = useField(name);

	const [isFocused, setIsFocused] = useState(false);

	const [isFilled, setIsFilled] = useState(false);
	


	const handleInputBlur = useCallback(() => {
		setIsFocused(false);

		setIsFilled(!!inputRef.current?.value);
	}, []);

	const handleInputFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: "value",
		});
	}, [fieldName, registerField]);

	return (
		<Container
			isFilled={isFilled}
			isFocused={isFocused}>
			{Icon && <Icon size={20} />}
			<input
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				defaultValue={defaultValue}
				ref={inputRef}
				{...rest}
			/>
			{error}
		</Container>
	);
};

export default Input;
