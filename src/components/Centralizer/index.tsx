import styles from './centralizer.module.scss';

export function Centralizer({ children }) {
  return <div className={styles.centralizer_div}>{children}</div>;
}
