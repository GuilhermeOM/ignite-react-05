import header from './header.module.scss';
import Image from 'next/image';

export default function Header() {
  return (
    <div className={header.header_container}>
      <Image src="/images/icon_logo.svg" width={40} height={25} />
      <h2>
        spacetraveling<span>.</span>
      </h2>
    </div>
  );
}
