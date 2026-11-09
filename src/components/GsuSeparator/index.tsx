import React, {FC} from "react";
import styles from './index.module.css';

interface GsuSeparatorProps {
  separator? : boolean
}
const GsuSeparator :FC<GsuSeparatorProps> = ({separator = true}) => {
 return (
    <>
      {separator && <div className={styles.separator}></div>}
    </>
 );}

export default GsuSeparator