import header from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className={header.header_container}>
      <Link href="/">
        <div className={header.header_logo}>
          <Image src="/images/icon_logo.svg" width={40} height={25} alt="logo" />
          <h2>
            spacetraveling<span>.</span>
          </h2>
        </div>
      </Link>
    </div>
  );
}
