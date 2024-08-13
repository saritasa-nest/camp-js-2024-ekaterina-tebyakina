import { ServerErrorAttributeDto } from '../dtos/server-error-attribute.dto';
import { ServerErrorAttribute } from '../models/server-error-attribute';

export namespace ServerErrorAttributeMapper {
	const SERVER_ERROR_ATTRIBUTE_MAP_FROM_DTO: Readonly<Record<ServerErrorAttributeDto, ServerErrorAttribute>> = {
		[ServerErrorAttributeDto.NonField]: ServerErrorAttribute.NonField,
		[ServerErrorAttributeDto.Email]: ServerErrorAttribute.Email,
		[ServerErrorAttributeDto.FirstName]: ServerErrorAttribute.FirstName,
		[ServerErrorAttributeDto.LastName]: ServerErrorAttribute.LastName,
		[ServerErrorAttributeDto.Avatar]: ServerErrorAttribute.Avatar,
		[ServerErrorAttributeDto.Password]: ServerErrorAttribute.Password,
	};

	/**
	 * Map error attribute dto.
	 * @param attribute  - Attribute dto.
	 * @returns Attribute model.
	 */
	export function fromDto(attribute: ServerErrorAttributeDto): ServerErrorAttribute {
		return SERVER_ERROR_ATTRIBUTE_MAP_FROM_DTO[attribute];
	}
}
