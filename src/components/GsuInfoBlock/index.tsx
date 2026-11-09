import {FC, useState} from 'react'
import styles from './index.module.css'
import cn from 'classnames/dedupe'
import {InfoBlockIcon} from "../../assets/CustomizeSvg/InfoBlockIcon";

interface GsuInfoBlockProps {
    text: string,
    position: string
}

const GsuInfoBlock: FC<GsuInfoBlockProps> = ({text, position}) => {
    const [hover, setHover] = useState(false);

    return (
        <div className={cn(styles.gsuInfoBlock, styles[position])}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             onTouchStart={() => setHover(!hover)}
             onTouchCancel={() => setHover(false)}>
            <div
                className={cn(styles.iconWrapper, styles[position])}
                style={{backgroundColor: hover ? "var(--color-primary-background)" : "transparent"}}>
                <InfoBlockIcon hover={hover}/>
            </div>

            <div className={cn(styles.textContainer, styles[position])}>
                {hover && <div className={cn(styles.textWrapper, styles[position])}>
                    <p className={styles.text}>{text}</p>
                </div>}
            </div>
        </div>
    )
}

export default GsuInfoBlock
