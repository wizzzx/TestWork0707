"use client";

import React from "react";
import styles from "./page.module.scss";
import cn from "classnames";

export default function Home() {
  return (
    <>
      <form action="" className={"container"}>
        <label htmlFor="" className={"form-label"}>
          Search location...
        </label>
        <input type="text" className={"form-control"} />
        <button type={"submit"} className={"btn btn-primary"}>
          Submit
        </button>
      </form>
    </>
  );
}
