export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  start_date: string; // RFC3339
  end_date: string; // RFC3339
  price: number;
  created_by: number;
}