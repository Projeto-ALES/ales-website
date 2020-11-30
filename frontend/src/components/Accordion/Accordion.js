import React, { useState } from 'react';

import styles from './Accordion.module.scss';

const Accordion = ({ text, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <span>{text}</span>
      </div>
      <div className={`${styles.body} ${isOpen ? styles.active : null}`}>
        {children}
      </div>
    </div>
  )
}

export default Accordion;