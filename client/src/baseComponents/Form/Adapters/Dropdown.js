import React, { Component } from 'react';
import { Dropdown as DropdownComponent } from '../../Dropdown';

import { FormFieldBox as FieldBox } from '../../FormFieldBox';

class Dropdown extends Component {
	render () {
		const {
			label,
			required,
			isValid,
			errorMessages,
			hasTooltip,
			toolTipMessage,
			toolTipIcon,
			displayInline,
			hasFocus
		} = this.props;

		return (
			<FieldBox
				label={label}
				required={required}
				hasErrors={!isValid}
				errorMessages={errorMessages}
				hasTooltip={hasTooltip}
				toolTipIcon={toolTipIcon}
				toolTipMessage={toolTipMessage}
				hasFocus={hasFocus}
				displayInline={displayInline}
			>
				<DropdownComponent
					{...this.props}
				/>
			</FieldBox>
		);
	}
}

export { Dropdown };
