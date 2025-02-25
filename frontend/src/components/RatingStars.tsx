import React from "react";
import {RateProp} from "../types/RateProp.ts";
import {Rating} from "@mantine/core";

export const RatingStars: React.FC<RateProp> = ({defaultValue, rate, isReadOnly, fractions, onChange, className}) => {
    return (
        <div>
            {isReadOnly &&
                <Rating className={className} defaultValue={defaultValue} value={rate} fractions={fractions} size="xl"
                        readOnly/>}
            {!isReadOnly &&
                <Rating onChange={onChange} className={className} defaultValue={defaultValue} value={rate}
                        fractions={fractions} size="xl"/>}
        </div>


    )
}