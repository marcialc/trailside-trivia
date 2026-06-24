import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../i18n/strings';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const ui = useUI();

  useEffect(() => {
    document.title = ui.listDocTitle;
  }, [ui]);

  return (
    <div className={styles.wrap}>
      <div className={styles.notfound}>
        <h1>{ui.notFoundTitle}</h1>
        <p>{ui.notFoundBody}</p>
        <Link to="/">{ui.backAllParks}</Link>
      </div>
    </div>
  );
}
