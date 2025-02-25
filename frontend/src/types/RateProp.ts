import React from 'react'
import {Rating} from "@mantine/core";

export type RateProp = {
    defaultValue: number
    rate: number;
    isReadOnly: boolean;
    fractions: number;
} & React.ComponentProps<typeof Rating>;