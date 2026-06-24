interface ConfigType {
  apiBaseUrl: string;
}

export const config: ConfigType = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
};
