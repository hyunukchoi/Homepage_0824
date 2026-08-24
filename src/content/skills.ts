/**
 * 기술 스택 데이터
 */
export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "engine",
    label: "GAME ENGINE",
    items: ["Unreal Engine 5", "Unity"],
  },
  {
    id: "language",
    label: "LANGUAGE",
    items: ["C++", "C#", "Python", "Go"],
  },
  {
    id: "xr",
    label: "VR / XR",
    items: ["SteamVR", "Meta SDK", "OpenXR", "Hand Tracking"],
  },
  {
    id: "ai",
    label: "AI TOOLS",
    items: ["Claude Code", "Antigravity", "Codex"],
  },
  {
    id: "devops",
    label: "DEVOPS & TOOLS",
    items: ["Jenkins", "Git", "SVN", "WPF / WinForm"],
  },
];
