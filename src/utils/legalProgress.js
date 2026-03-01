const LS_LEGAL_PROGRESS_KEY = "lumen.progress.legal";

export const LEGAL_SIM_IDS = {
  landlordRightsSim: "landlordRightsSim",
  debtsSim: "debtsSim",
  repairsGameSim: "repairsGameSim",
};

function safeParseJson(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function readLegalProgress() {
  const raw = localStorage.getItem(LS_LEGAL_PROGRESS_KEY);
  return safeParseJson(raw, { sims: {} });
}

export function writeLegalProgress(next) {
  localStorage.setItem(LS_LEGAL_PROGRESS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("lumen:progress-updated"));
}

export function markLegalVisited(simId) {
  const data = readLegalProgress();
  const prevSim = data?.sims?.[simId] || {};

  const next = {
    ...data,
    sims: {
      ...(data.sims || {}),
      [simId]: {
        ...prevSim,
        visited: true,
        visitedAt: prevSim.visitedAt || new Date().toISOString(),
      },
    },
  };

  writeLegalProgress(next);
}

export function markLegalCompleted(simId, meta = {}) {
  const data = readLegalProgress();
  const prevSim = data?.sims?.[simId] || {};

  const next = {
    ...data,
    sims: {
      ...(data.sims || {}),
      [simId]: {
        ...prevSim,
        visited: true,
        visitedAt: prevSim.visitedAt || new Date().toISOString(),
        completed: true,
        completedAt: prevSim.completedAt || new Date().toISOString(),
        ...meta,
      },
    },
  };

  writeLegalProgress(next);
}

export function calcLegalProgressPercent(mode = "visited") {
  const data = readLegalProgress();
  const sims = data?.sims || {};

  const ids = Object.values(LEGAL_SIM_IDS);
  const total = ids.length;

  const doneCount = ids.filter((id) => {
    const item = sims?.[id];
    if (!item) return false;
    return mode === "completed" ? Boolean(item.completed) : Boolean(item.visited);
  }).length;

  return total > 0 ? Math.round((doneCount / total) * 100) : 0;
}