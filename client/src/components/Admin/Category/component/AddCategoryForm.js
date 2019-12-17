import React, { useContext } from 'react';
import { FormsContext as GlobalFormsContext } from '../../../../App/store/FormsContext';

import Form, { Field } from '../../../../baseComponents/Form';
import Textbox from '../../../../baseComponents/Form/Adapters/Textbox';
import Dropdown from '../../../../baseComponents/Form/Adapters/Dropdown';
import FormLayout, {
	FormLayoutHeader,
	FormLayoutFooter,
	FormLayoutItem,
	FormLayoutItemGroup
} from '../../../../baseComponents/FormLayout';
import ButtonGroup from '../../../../baseComponents/ButtonGroup';
import Button from '../../../../baseComponents/Button';

import { ADD_CATEGORY_FORM_NAME } from '../consts';
import { number, required } from '../../../../utils/validators';

const AddCategoryForm = () => {
	const { forms } = useContext(GlobalFormsContext);

	console.log(forms);

	const addCategory = (val) => {
		console.log(val);
	};

	const rightSectionButtons = (
		<>
			<Button
				label="!!добавить"
				type="primary"
				actionHandler={() => forms.addCategoryForm.submitForm()}
			/>
		</>
	);

	return (
		<Form
			onSubmit={addCategory}
			name={ADD_CATEGORY_FORM_NAME}
		>
			<div onClick={() => { forms.addCategoryForm.changeField({ name: 'age', value: 1 }); }}>asdas</div>
			<FormLayout>
				<FormLayoutHeader title="!!Добавить категорию" />
				<FormLayoutItemGroup>
					<FormLayoutItem>
						<Field
							component={Textbox}
							name="age"
							label="!Название категории"
							required
							validate={[number, required]}
						/>
					</FormLayoutItem>
					<FormLayoutItem>
						<Field
							component={Dropdown}
							name="dropdown"
						/>
					</FormLayoutItem>
					<FormLayoutItem>
						<Field
							component={Dropdown}
							name="dropeqweqwdown"
						/>
					</FormLayoutItem>
					<FormLayoutItem>
						<Field
							component={Dropdown}
							name="test"
						/>
					</FormLayoutItem>
				</FormLayoutItemGroup>
				<FormLayoutFooter>
					<ButtonGroup rightButtons={rightSectionButtons} />
				</FormLayoutFooter>
			</FormLayout>
		</Form>
	);
};

export default AddCategoryForm;