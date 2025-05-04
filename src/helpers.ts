import {allFakers} from "@faker-js/faker";
import {validCountryCodes} from "./constants";
import { $ } from "zx";
export const isValidCountryCode = (code: string) =>
	validCountryCodes.has(code.toUpperCase());

export const retrieveFakerLocaleFromCountry = (country: string) => {
	const fakerKey = country as keyof typeof allFakers;
	const faker = allFakers[fakerKey];

	if (faker) {
		return faker;
	}

	const calculatedFakerKey = Object.keys(allFakers).find((el) =>
		el.includes(country)
	) as keyof typeof allFakers;

	const calculatedFaker = allFakers[calculatedFakerKey];

	if (calculatedFaker) {
		return calculatedFaker;
	}

	return allFakers.en;
};

export const copyToClipboard = async (value: string) => {
	await $`echo ${value} | pbcopy`;
	console.log("Copied to clipboard!");
}