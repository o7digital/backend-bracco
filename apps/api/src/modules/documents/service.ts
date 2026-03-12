import { documentAutomationCards, documentTemplates } from "@bracco/config";

export const listDocuments = () => documentAutomationCards;

export const listDocumentTemplates = () => documentTemplates;

export const getDocumentSummary = () => ({
  templates: documentTemplates.length,
  automated: documentAutomationCards.filter((item) => item.automationLevel === "ready_for_handoff").length,
  guided: documentAutomationCards.filter((item) => item.automationLevel === "guided").length,
});
