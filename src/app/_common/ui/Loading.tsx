//https://uiverse.io/Admin12121/black-sheep-17
"use client";
import React from "react";
import styles from "./css/Loading.module.css";
import { LoadingStore } from "@/app/store";
export default function Loading() {
  const { dataLoading } = LoadingStore();
  if (!dataLoading) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={styles.loader}>
        <div className={styles.box + " " + styles.box0}>
          <div></div>
        </div>
        <div className={styles.box + " " + styles.box1}>
          <div></div>
        </div>
        <div className={styles.box + " " + styles.box2}>
          <div></div>
        </div>
        <div className={styles.box + " " + styles.box3}>
          <div></div>
        </div>
        <div className={styles.box + " " + styles.box4}>
          <div></div>
        </div>
        <div className={styles.box + " " + styles.box5}>
          <div></div>
        </div>
        <div className={styles.box + " " + styles.box6}>
          <div></div>
        </div>
        <div className={styles.box + " " + styles.box7}>
          <div></div>
        </div>
        <div className={styles.ground}>
          <div></div>
        </div>
      </div>
    </div>
  );
}
