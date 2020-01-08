import React, { useContext, useRef, useCallback, useEffect } from 'react';
import { ContextForm } from './store/FormContext';

import { validate as validateFromUtils } from './utils';
import { isUndefined } from '../../utils';

const Field = (props) => {
	const { name, component, validate } = props;
	const {
		registerField,
		setFieldValue,
		formValues,
		fields,
		setFieldValidationResult
	} = useContext(ContextForm);

	const isRegistered = useRef(false);
	const prevValue = useRef(null);

	useEffect(() => {
		registerField({
			name,
			validate,
			isValid: true,
			value: null,
			isTouched: false,
			errorMessages: [],
			hasValidationError: false
		});

		isRegistered.current = true;
	}, []);

	const validateField = useCallback((value) => {
		if (isUndefined(validate) || prevValue.current === value) return;

		const validationResult = validateFromUtils(value, validate);

		prevValue.current = value;
		setFieldValidationResult(validationResult, name);
	}, [validate, setFieldValidationResult, name]);

	const handleChange = useCallback(value => {
		validateField(value);

		setFieldValue({
			[name]: value
		});
	}, [name, setFieldValue, validate, validateField]);

	const Component = component;

	return (
		<>
			{
				isRegistered.current && (
					<Component
						isValid={fields[name].isValid}
						errorMessages={fields[name].errorMessages}
						onFieldChange={handleChange}
						value={formValues[name]}
						{...props}
					/>
				)
			}
		</>
	);
};

export { Field };
