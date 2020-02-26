import React from 'react';
import PropTypes from 'prop-types';

import { ModalContent, ModalFooter, ModalHeader } from '../../../../baseComponents/Modal';
import Form, { Field } from '../../../../baseComponents/Form';
import FormLayout, { FormLayoutItem, FormLayoutItemGroup } from '../../../../baseComponents/FormLayout';
import { Textbox } from '../../../../baseComponents/Form/Adapters';
import ButtonGroup from '../../../../baseComponents/ButtonGroup';
import { EDIT_FILTER_FORM } from '../../consts';

const FiltersEditFilterModalForm = (
	{
		handleClose,
		leftButtons,
		rightButtons,
		initialValues,
		handleUpdateFilter
	}
) => {
	return (
		<>
			<ModalHeader
				handleClose={handleClose}
				label="!!!Редактировать фильтр"
			/>
			<ModalContent>
				<Form
					name={EDIT_FILTER_FORM}
					initialValues={initialValues}
					onSubmit={handleUpdateFilter}
				>
					<FormLayout>
						<FormLayoutItemGroup>
							<FormLayoutItem>
								<Field
									component={Textbox}
									name="name"
									label="!!!Название фильтра а админ панеле"
									required
									validate={{
										required: true
									}}
								/>
							</FormLayoutItem>
							<FormLayoutItem>
								<Field
									component={Textbox}
									name="displayName"
									label="!!!Название фильтра в магазине"
									required
									validate={{
										required: true
									}}
								/>
							</FormLayoutItem>
							<FormLayoutItem>
								<Field
									component={Textbox}
									name="sortOrder"
									label="!!!Порядок отображения"
									hasTooltip
									toolTipMessage="!!!Место фильтра в общем списке фильтров (например: '5')"
									validate={{
										number: true
									}}
								/>
							</FormLayoutItem>
						</FormLayoutItemGroup>
					</FormLayout>
				</Form>
			</ModalContent>
			<ModalFooter>
				<ButtonGroup
					leftButtons={leftButtons}
					rightButtons={rightButtons}
				/>
			</ModalFooter>
		</>
	);
};

FiltersEditFilterModalForm.propTypes = {
	handleClose: PropTypes.func,
	leftButtons: PropTypes.object,
	rightButtons: PropTypes.object,
	initialValues: PropTypes.object,
	handleUpdateFilter: PropTypes.func
};

export default FiltersEditFilterModalForm;
