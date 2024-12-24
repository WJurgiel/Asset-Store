import React from 'react'
import {AssetGridItemProps} from "../types/AssetGriditemProps.ts";
import {Rating} from "@mantine/core";

export const AssetGridItem: React.FC<AssetGridItemProps> = ({imageSrc, title, author, rate}) => {
    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                padding: '16px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#EBEFF3',
                    border: '1px solid #ddd',
                }}
            >
                <img
                    src={imageSrc}
                    alt={title}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div
                style={{
                    marginTop: '100px',
                    textAlign: 'left',
                }}
            >
                <div>
                    <b>{title}</b>
                </div>
                <div style={{color: '#555', fontSize: '14px'}}>{author}</div>
            </div>
            <div
                style={{
                    marginTop: '8px',
                    textAlign: 'center',
                }}
            >
                <Rating value={rate} fractions={2} readOnly/>
            </div>
        </div>
    );
};