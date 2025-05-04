#!/usr/bin/env bun

import {Command} from "commander";
import {
	copyToClipboard,
	isValidCountryCode,
	retrieveFakerLocaleFromCountry,
} from "./helpers";
import {randomUUID} from "node:crypto";

const program = new Command();

program
	.name("sgaavalon")
	.description("A CLI that generate random values that everyone needs for test")
	.version("v1.0.0")
	.option("-c, --copy", "Copy to clipboard");

program
	.command("phone")
	.description("Generate a random phone number")
	.option(
		"--country <country>",
		"country to generate a phone number specific to that country"
	)
	.action(async (_, args) => {
		const opts = args.optsWithGlobals();
		const requestedCopy = opts.copy ?? false;
		const country = opts.country ?? "us";
		const isCountryValid = isValidCountryCode(country);

		if (!isCountryValid) {
			console.error("Contry not valid!");
			return process.exit(1);
		}

		const fakerLocalized = retrieveFakerLocaleFromCountry(country);
		const phoneNumber = fakerLocalized.phone.number({style: "human"});
		if (requestedCopy) {
			await copyToClipboard(phoneNumber);
			return;
		}
		console.log(phoneNumber);
	});

program
	.command("address")
	.description("Generate a address")
	.option(
		"--country <country>",
		"country to generate an address specific to that country"
	)
	.action(async (_, args) => {
		const opts = args.optsWithGlobals();
		const requestedCopy = opts.copy ?? false;
		const country = opts.country ?? "us";
		const isCountryValid = isValidCountryCode(country);

		if (!isCountryValid) {
			console.error("Contry not valid!");
			return process.exit(1);
		}

		const fakerLocalized = retrieveFakerLocaleFromCountry(country);
		const address = fakerLocalized.location.streetAddress({
			useFullAddress: true,
		});
		if (requestedCopy) {
			await copyToClipboard(address);
			return;
		}
		console.log(address);
	});

program
	.command("uuid")
	.description("Generate a UUID")
	.action(async (_, args) => {
		const opts = args.optsWithGlobals();
		const requestedCopy = opts.copy ?? false;
		const uuid = randomUUID();
		if (requestedCopy) {
			await copyToClipboard(uuid);
			return;
		}
		console.log(uuid);
	});

program.parse();
