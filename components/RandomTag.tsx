import React, { Children, useEffect, useState } from 'react';

interface RandomTagProps {
    children: React.ReactNode;
}

export default function RandomTag({ children }: RandomTagProps) {
    const childArray = Children.toArray(children);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(
        childArray.length > 0 ? Math.floor(Math.random() * childArray.length) : null
    );

    useEffect(() => {
        if (childArray.length > 0 && selectedIndex === null) {
            setSelectedIndex(Math.floor(Math.random() * childArray.length));
        }
    }, [childArray.length, selectedIndex]);

    if (selectedIndex === null || childArray.length === 0) {
        return null;
    }

    return <>{childArray[selectedIndex]}</>;
}
