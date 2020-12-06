import Stats from 'stats.js';

export const handleStats = (target: HTMLDivElement) => {
  const stats = new Stats();
  stats.showPanel(0);
  target.appendChild(stats.dom);
  return stats;
}