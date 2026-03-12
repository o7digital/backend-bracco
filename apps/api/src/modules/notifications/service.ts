import { notificationFeed } from "@bracco/config";

export const listNotifications = () => notificationFeed;

export const getNotificationSummary = () => ({
  queued: notificationFeed.filter((item) => item.status === "queued").length,
  delivered: notificationFeed.filter((item) => item.status === "delivered").length,
  actionRequired: notificationFeed.filter((item) => item.status === "action_required").length,
});
