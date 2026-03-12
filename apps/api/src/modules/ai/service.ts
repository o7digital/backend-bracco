import { aiInsights } from "@bracco/config";

export const listAiInsights = () => aiInsights;

export const getAiOverview = () => ({
  totalSignals: aiInsights.length,
  attentionSignals: aiInsights.filter((entry) => entry.label === "attention").length,
  positiveSignals: aiInsights.filter((entry) => entry.label === "positive").length,
  averageConfidence: Math.round(aiInsights.reduce((sum, entry) => sum + entry.score, 0) / aiInsights.length),
});
