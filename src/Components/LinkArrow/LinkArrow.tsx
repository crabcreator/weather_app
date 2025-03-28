interface LinkArrowProps {
    size: string;
    borderWidth?: string;
}

export default function LinkArrow({size, borderWidth='1.8px'}:LinkArrowProps) {

    return (
        <div style={{
            display: 'flex',
            alignSelf: 'center',
            borderTop: `${borderWidth} solid`,
            borderRight: `${borderWidth} solid`,
            rotate: '45deg',
            width: size,
            height: size,
            marginLeft: '2px'
        }}></div>
    )
}