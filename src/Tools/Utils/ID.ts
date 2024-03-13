import crypto from 'crypto';

export const createHashId = (str: string) => crypto.createHash('sha256').update(str).digest('base64');

type CharSetNames = 'numbers' | 'specials' | 'a-z' | 'A-Z';

export default class ID {
	private mask?: string;
	private hasHash = false;
	private length: number = 8;

	private numbers = '0123456789';
	private specials = '!@#$(%^&*)+=/';
	private 'a-z' = 'abcdefghijklmnopqrstuvwxyz';
	private 'A-Z' = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	constructor(length: number = 8) {
		this.length = length;
	}

	private charSets: any = {
		numbers: this.numbers,
		specials: this.specials,
		'a-z': this['a-z'],
		'A-Z': this['A-Z'],
	};

	private getRandomChar = (chars: string[], inputChar?: string) => {
		let charArr = chars;
		if (inputChar) {
			let cs: any;
			const map: any = {
				'/X': () => (cs = 'X'),
				'%X': () => (cs = this['A-Z']),
				'%n': () => (cs = this.numbers),
				'%x': () => (cs = this['a-z']),
				'%s': () => (cs = this['specials']),
			};
			map?.[inputChar]?.();
			if (cs) charArr = cs?.split?.('');
		}
		return charArr[Math.floor(Math.random() * charArr.length)];
	};

	withOut(...charSetNames: CharSetNames[]) {
		charSetNames?.forEach(cs => delete this.charSets?.[cs]);
		return this;
	}

	only(...charSetNames: CharSetNames[]) {
		Object.keys(this.charSets || {}).forEach((cs: any) => {
			if (charSetNames?.includes(cs)) return;
			delete this.charSets?.[cs];
		});
		return this;
	}

	validChars(regex: RegExp) {
		Object.entries(this.charSets || {}).forEach(([charSet, value]) => {
			this.charSets[charSet] = [...((value as any) || [])]
				?.filter((v: string) => regex.test(v))
				?.join('');
		});
		return this;
	}

	pattern(mask: string) {
		this.mask = mask;
		this.length = mask?.length;
		return this;
	}

	hash() {
		this.hasHash = true;
		return this;
	}

	generate(): string {
		let id;

		let chars = Object.values(this.charSets)
			?.map((i: any) => i?.split?.(''))
			?.flat();

		if (this.mask) {
			id = this.mask?.replace(/%(n|x|X|s)|\/X|X/g, c => this.getRandomChar(chars, c));
		}

		if (this.hasHash) {
			id = createHashId(id + new Date().toUTCString());
		}

		if (!id)
			id = [...Array(this.length)]
				.fill('')
				?.map(_ => this.getRandomChar(chars))
				.join('');

		return id;
	}
}

export const generateTempID = () => new ID().pattern('@Temp-XXXXXX').withOut('specials').generate();

export const generateClassID: (table?: string) => string = table => {
	const CLASS_NAME = table?.toUpperCase?.()?.replace?.(/X/g, '/X');
	return new ID()
		.withOut('specials')
		.pattern(`${CLASS_NAME ?? 'XXXX'}-XXXXX-XXXX-XXXX`)
		.generate();
};
