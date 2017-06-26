export class Currency {
	base: String;
	date: Date;
	rate: RateClass[];
    data: Object;
}

export class RateClass {
	currencyName: String;
	rate: Number;
}