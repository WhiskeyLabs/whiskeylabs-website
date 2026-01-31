"use strict";

import React from "react";
import clsx from "clsx";

interface GridProps {
    children: React.ReactNode;
    className?: string;
}

export function Grid({ children, className }: GridProps) {
    return (
        <div
            className={clsx(
                "grid grid-cols-1 md:grid-cols-3 w-full min-h-screen",
                "border-l border-t border-dashed grid-line-dashed",
                className
            )}
        >
            {children}
        </div>
    );
}

interface GridCellProps {
    children?: React.ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3;
    rowSpan?: 1 | 2 | 3;
}

export function GridCell({ children, className, colSpan = 1, rowSpan = 1 }: GridCellProps) {
    return (
        <div
            className={clsx(
                "border-b border-r border-dashed grid-line-dashed p-6 md:p-8 lg:p-12 relative",
                // Column Spans
                colSpan === 2 && "md:col-span-2",
                colSpan === 3 && "md:col-span-3",
                // Row Spans
                rowSpan === 2 && "md:row-span-2",
                rowSpan === 3 && "md:row-span-3",
                className
            )}
        >
            {children}
        </div>
    );
}
