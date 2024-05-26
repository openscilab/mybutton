interface Window {
	logs?: boolean;
	user_token?: string;
	CONFIG?: OBJECT;
	MODE?: 'PRODUCTION' | 'DEVELOPMENT' | 'LOCAL';
}

declare module 'react-contextmenu' {
	interface ContextMenuProps {
		children?: React.ReactNode;
	}
	interface ContextMenuTriggerProps {
		children?: React.ReactNode;
	}
	interface MenuItemProps {
		children?: React.ReactNode;
	}
}

declare module '*.mp4' {
	const src: string;
	export default src;
}

declare module 'react-dom/client';

type SUG<T extends string = string> = T | (string & {});

type OBJECT<T = any> = Record<string | number | symbol, T>;

type EndsWith<T, U extends string> = T extends `${any}${U}` ? T : U;

type StartsWith<T, U extends string> = T extends `${U}${any}` ? T : U;

type FC<P = {}> = React.FunctionComponent<{ children?: React.ReactNode } & P>;

type Includes<T, U extends string> = T extends `${any}${U}${any}` ? T : U;
