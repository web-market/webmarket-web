// SELECTORS
// fields: array. all registered fields (name, value, validationRules);
// formValidationRules: array. all validation rules from fields, if exists;
// isFormValid: is form valid. bool.
// formValues: form values. array. { name: value }

// ACTIONS
//initForm: init form name, fields, validation rules. signature => {name, fields}
//changeField: change fields metadata. signature => {name, values, isValid, validationRules}
//validateForm: validate form. call on init and before send. signature => [{field}, {...}]
//setIsFormValid: manually set form validation state. try no to use. signature => bool

import React, { useReducer, useCallback } from 'react';
import {
	INIT_FIELDS,
	INIT_FORM_NAME,
	SET_FORM_VALID,
	SET_FIELD_VALUE,
	SET_FIELD_VALIDATION_RESULT
} from './consts';
import {
	validate as validateFromUtils,
	setValidationResult as setValidationResultFromUtils
} from '../utils';
import { isUndefined } from '../../../utils';

const ContextForm = React.createContext();

const initialState = {
	formName: '',
	fields: {},
	formValidationRules: [],
	formValues: {},
	isFormValid: true,
};

const reducer = (state, payload) => {
	switch (payload.type) {
		case INIT_FORM_NAME:
		return {
			...state,
			formName: payload.name
		};
		case INIT_FIELDS:
			return {
				...state,
				fields: { ...state.fields, ...payload.field }
			};
		case SET_FIELD_VALUE:
			return {
				...state,
				formValues: { ...state.formValues, ...payload.field }
			};
		case SET_FORM_VALID:
			return {
				...state,
				isFormValid: payload.valid
			};
		case SET_FIELD_VALIDATION_RESULT:
			const field = setValidationResultFromUtils(state.fields, payload);

			return {
				...state,
				fields: { ...state.fields, ...field }
			};
	}
};

function FormContextProvider (props) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const registerField = (fieldObject) => {
		dispatch({
			type: INIT_FIELDS,
			field: {
				[fieldObject.name]: {
					...fieldObject
				}
			}
		});

		dispatch({
			type: SET_FIELD_VALUE,
			field: { [fieldObject.name]: fieldObject.value }
		});
	};

	const setFieldValue = (field) => {
		dispatch({
			type: SET_FIELD_VALUE,
			field
		});
	};

	const setFieldValidationResult = (validationResult, name) => {
		const { isValid, errorMessages } = validationResult;

		const payload = {
			name,
			isValid,
			errorMessages
		};

		dispatch({
			type: SET_FIELD_VALIDATION_RESULT,
			payload
		});
	};

	const setFormValues = useCallback((initialValues) => {
		for (const item in initialValues) {
			if (initialValues.hasOwnProperty(item)) {
				const field = { [item]: initialValues[item] };

				dispatch({
					type: SET_FIELD_VALUE,
					field
				});
			}
		}
	}, []);

	const _initFormName = useCallback((name) => {
		dispatch({
			type: INIT_FORM_NAME,
			name
		});
	}, []);

	const setIsFormValid = useCallback(valid => {
		dispatch({
			type: SET_FORM_VALID,
			valid
		});
	}, []);

	const validateForm = useCallback((fields, values) => {
		const validationResult = [];

		for (const field in fields) {
			if (fields.hasOwnProperty(field)) {
				const { validate } = fields[field];

				if (isUndefined(validate)) {
					validationResult.push(true);
				} else {
					const { isValid, errorMessages } = validateFromUtils(values[field], validate);

					const payload = {
						name: field,
						isValid,
						errorMessages
					};

					dispatch({
						type: SET_FIELD_VALIDATION_RESULT,
						payload
					});

					validationResult.push({ isValid, errorMessages, field });
				}
			}
		}

		const hasError = validationResult.some(result => result.isValid === false);

		const errorFields = validationResult.filter(result => result.isValid === false);

		return new Promise((resolve, reject) => {
			return hasError ? reject(errorFields) : resolve(hasError);
		});
	}, [setIsFormValid]);

	const initForm = useCallback(({ name }) => {
		_initFormName(name);
	}, [_initFormName]);

	return (
		<ContextForm.Provider value={{
			...state,
			initForm,
			validateForm,
			setFieldValue,
			setFormValues, // only on init
			registerField,
			setFieldValidationResult,
			setIsFormValid, //try not to use
		}}
		>
			{props.children}
		</ContextForm.Provider>
	);
}

export { ContextForm, FormContextProvider };
