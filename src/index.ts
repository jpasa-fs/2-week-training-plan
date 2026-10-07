export function formatTrackingLabel(carrier: string, trackingNumber: string): string {
  return `${carrier.toUpperCase()}:${trackingNumber}`;
}
