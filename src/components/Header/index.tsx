import React from "react";
import styles from "./index.module.scss";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={className}>
      <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
        <div className={"container-fluid container-xl"}>
          <Link href={"/"} className={"navbar-brand"}>
            <Image
              src={"/icons/main_logo.svg"}
              alt={"main_logo"}
              width={150}
              height={100}
            />
          </Link>
          <ul className={"navbar-nav ms-auto"}>
            <li className={"nav-item"}>
              <Link href={"/detailed-weather-forecast"} className={"nav-link"}>
                Прогноз погоды на неделю
              </Link>
            </li>
            <li className={"nav-item"}>
              <Link href={"/favorites"} className={"nav-link"}>
                Избранное
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
