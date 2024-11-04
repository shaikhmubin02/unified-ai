import Image from 'next/image';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Image src="/logo.png" alt="Loading..." width={30} height={30} />
    </div>
  );
};

export default Loader; 