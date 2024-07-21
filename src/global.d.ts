interface Window {
	logs?: boolean;
	user_token?: string;
	CONFIG?: OBJECT;
	MODE?: 'PRODUCTION' | 'DEVELOPMENT' | 'LOCAL';
}

declare module 'react-dom/client';

type SUG<T extends string = string> = T | (string & {});

type OBJECT<T = any> = Record<string | number | symbol, T>;

type FC<P = {}> = React.FunctionComponent<{ children?: React.ReactNode } & P>;
