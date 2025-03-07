import React from 'react';
import { Text } from '@chakra-ui/react';

const ScrollLink = ({ to, children, ...rest }) => {
    const handleClick = (e) => {
        e.preventDefault();
        const element = document.getElementById(to);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Text
            cursor="pointer"
            onClick={handleClick}
            {...rest}
        >
            {children}
        </Text>
    );
};

export default ScrollLink;