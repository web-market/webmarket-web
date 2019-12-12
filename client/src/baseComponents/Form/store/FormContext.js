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
	CHANGE_FILED,
	SET_FORM_VALID,
	SET_FORM_VALIDATION_RULES,
	SET_FORM_VALUES,
	SET_FORM_VALUE
} from './consts';
import { isFunction, isUndefined } from '../../../utils';
import { merge } from './utils';

const ContextForm = React.createContext();

const initialState = {
	formName: '',
	fields: [],
	formValidationRules: [],
	formValues: [],
	isFormValid: true,
};

const reducer = (state, payload) => {
	switch (payload.type) {
		case INIT_FIELDS:
			return {
				...state,
				fields: [payload.field, ...state.fields]
			};
		case INIT_FORM_NAME:
			return {
				...state,
				formName: payload.name
			};
		case CHANGE_FILED:
			return {
				...state,
				fields: state.fields.map(f => {
					if (f.name === payload.obj.name) {
						return payload.obj;
					}

					return f;
				})
			};
		case SET_FORM_VALID:
			return {
				...state,
				isFormValid: payload.valid
			};
		case SET_FORM_VALIDATION_RULES:
			return {
				...state,
				formValidationRules: payload.initialValidationRules
			};
		case SET_FORM_VALUE:
			return {
				...state,
				formValues: merge(state.formValues, payload.field)
			};
		case SET_FORM_VALUES:
			return {
				...state,
				formValues: [...payload.formValues]
			};
	}
};

function FormContextProvider (props) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const setFormValue = (field) => {
		dispatch({
			type: SET_FORM_VALUE,
			field
		});
	};

	const setFormValues = useCallback((fields) => {
		const formValues = fields.map(field => {
			return {
				[field.name]: field.value
			};
		});

		dispatch({
			type: SET_FORM_VALUES,
			formValues
		});
	}, []);

	const registerField = (field) => {
		dispatch({
			type: INIT_FIELDS,
			field
		});

		return field;
	};

	const _initValidationRules = useCallback((elems) => {
		const fields = elems.filter((e) => isFunction(e.type));

		const initialValidationRules = [];

		fields.forEach(field => {
			if (isUndefined(field.props.validate)) return;

			field.props.validate.forEach(f => {
				if (initialValidationRules.length === 0) {
					initialValidationRules.push(f);
				} else {
					initialValidationRules.forEach(t => {
						if (t.name !== f.name) {
							initialValidationRules.push(f);
						}
					});
				}
			});
		});

		dispatch({
			type: SET_FORM_VALIDATION_RULES,
			initialValidationRules
		});
	}, []);

	const _initFormName = useCallback((name) => {
		dispatch({
			type: INIT_FORM_NAME,
			name
		});
	}, []);

	const changeField = useCallback(obj => {
		dispatch({
			type: CHANGE_FILED,
			obj
		});
	}, []);

	const setIsFormValid = useCallback(valid => {
		dispatch({
			type: SET_FORM_VALID,
			valid
		});
	}, []);

	const validateForm = useCallback((fields, getPromise = true) => {
		const validationResult = fields.map(f => {
			const { validationRules, value, name } = f;

			if (isUndefined(validationRules)) return true;

			const intermediateResult = validationRules.map(r => {
				return r(value);
			});

			changeField({
				name,
				value,
				validationRules,
				isValid: !intermediateResult.includes(false)
			});

			return intermediateResult;
		});

		const hasError = validationResult.flat().includes(false);
		setIsFormValid(!hasError);

		if (getPromise) {
			return new Promise((resolve, reject) => {
				return hasError ? reject(new Error('Validation errors')) : resolve(hasError);
			});
		}
	}, [state.fields, changeField, setIsFormValid]);

	const initForm = useCallback(({ name }) => {
		_initFormName(name);
	}, [_initFormName]);

	return (
		<ContextForm.Provider value={{
			...state,
			initForm,
			changeField,
			validateForm,
			setFormValue,
			setFormValues, // only on init
			registerField,
			setIsFormValid, //try not to use
		}}
		>
			{props.children}
		</ContextForm.Provider>
	);
}

export { ContextForm, FormContextProvider };
