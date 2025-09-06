// Generate a unique device ID for anonymous users
export const getDeviceId = (): string => {
  const DEVICE_ID_KEY = 'climbing_guide_device_id';
  
  // Try to get existing device ID from localStorage
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  
  if (!deviceId) {
    // Generate a new device ID
    deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  
  return deviceId;
};