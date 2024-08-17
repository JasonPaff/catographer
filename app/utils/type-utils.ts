import type { ReactNode } from 'react';

declare global {
    type ClassName<P = unknown> = P & { className?: string };
    type Children<P = unknown> = P & { children?: ReactNode };
    type ChildrenClassName<P = unknown> = P & { children?: ReactNode } & { className?: string };
    type RequiredChildren<P = unknown> = P & { children: ReactNode };
    type RequiredChildrenClassName<P = unknown> = P & { children: ReactNode } & { className?: string };
}
