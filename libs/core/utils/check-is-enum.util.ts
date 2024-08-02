/**
 * Checks whether the passed value is a value from the specified enum.
 * @param value  Value for check.
 * @param enumArgument Enum whose element the passed value should be.
 * @returns  The result of the check. True, if passed value is a value from the specified enum.
 */
export function checkIsEnumMember<TEnum>(
	value: unknown, enumArgument: Record<string | number | symbol, TEnum>,
): value is TEnum {
	return (Object.values(enumArgument) as unknown[]).includes(value);
}
