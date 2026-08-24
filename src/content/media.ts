/**
 * 프로젝트 이미지 매핑
 * ─────────────────────────────────────────────
 * public/projects 에 실제로 존재하는 파일만 적혀 있습니다.
 * 커버가 없는 프로젝트는 유튜브 스냅샷(public/projects/snapshots/<videoId>.jpg)을 씁니다.
 */

import type { Project } from "./projects";

const COVERS: Record<string, string> = {
  "vr-ct-viewer": "/projects/vr-ct-viewer.jpg",
  "vr-shooter": "/projects/vr-shooter.jpg",
  "vr-cpr": "/projects/vr-cpr.jpg",
  "barista-vr": "/projects/barista-vr.jpg",
  "vr-multiplay-edu": "/projects/vr-multiplay-edu.jpg",
  "vr-cms": "/projects/snapshots/EKMGAwwdiC8.jpg",
  "plant-process": "/projects/plant-process.jpg",
  "safety-360": "/projects/snapshots/rPDS_D28yz0.jpg",
  "home-nursing": "/projects/snapshots/UELsZuPHolk.jpg",
  "fall-simulator": "/projects/fall-simulator.jpg",
  "roblox-cooking": "/projects/roblox-cooking.jpg",
  "kal-online": "/projects/snapshots/u482C3fF_qE.jpg",
  "ntd-rakion": "/projects/snapshots/oBbayeBZ-yE.jpg",
  "spin-heroes": "/projects/spin-heroes.jpg",
  "digimon-masters": "/projects/digimon-masters.png",
};

/** 케이스 스터디 상세에서 쓰는 추가 스냅샷 (있는 것만) */
const GALLERIES: Record<string, string[]> = {
  "vr-ct-viewer": [
    "/projects/snapshots/IEp7bjI_z4U_1.jpg",
    "/projects/snapshots/IEp7bjI_z4U_2.jpg",
    "/projects/snapshots/IEp7bjI_z4U_3.jpg",
  ],
  "vr-shooter": [
    "/projects/snapshots/cZiHYipa0jY_1.jpg",
    "/projects/snapshots/cZiHYipa0jY_2.jpg",
    "/projects/snapshots/-icwFTwYyQE_1.jpg",
  ],
  "vr-cpr": [
    "/projects/snapshots/Q3D48ghc9Lw_1.jpg",
    "/projects/snapshots/Q3D48ghc9Lw_2.jpg",
    "/projects/snapshots/Q3D48ghc9Lw_3.jpg",
  ],
  "vr-cms": [
    "/projects/snapshots/EKMGAwwdiC8_1.jpg",
    "/projects/snapshots/EKMGAwwdiC8_2.jpg",
    "/projects/snapshots/EKMGAwwdiC8_3.jpg",
  ],
  "barista-vr": [
    "/projects/snapshots/1hnMJgX4tvE_1.jpg",
    "/projects/snapshots/1hnMJgX4tvE_2.jpg",
    "/projects/snapshots/1hnMJgX4tvE_3.jpg",
  ],
};

export function coverOf(project: Project): string | null {
  if (project.cover) return project.cover;
  if (COVERS[project.id]) return COVERS[project.id];
  const first = project.videos?.[0]?.id;
  return first ? `/projects/snapshots/${first}.jpg` : null;
}

export function galleryOf(projectId: string): string[] {
  return GALLERIES[projectId] ?? [];
}

export function thumbOf(videoId: string): string {
  return `/projects/snapshots/${videoId}.jpg`;
}
