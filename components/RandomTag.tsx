import React, { Children, useEffect, useState } from 'react';

interface RandomTagProps {
    children: React.ReactNode;
}

export default function RandomTag({ children }: RandomTagProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const childArray = Children.toArray(children);

    useEffect(() => {
        if (childArray.length > 0) {
            setSelectedIndex(Math.floor(Math.random() * childArray.length));
        }
    }, []);

    if (selectedIndex === null || childArray.length === 0) {
        return null;
    }

    return <>{childArray[selectedIndex]}</>;
}
