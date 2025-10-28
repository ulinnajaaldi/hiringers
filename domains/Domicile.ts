export interface ProvinceResponse {
  code: string;
  messages: string;
  value: Province[];
}

export interface Province {
  id: string;
  name: string;
}
