export type Game = {
  id?: string;
  name: string;
  status?: string;
  description: string;
  tutorial: string;
  image: string;
  type: "quiz" | "shake";
  allowItemExchange: boolean;
  brandId: string;
  gamePlay: Gameplay[] | any;
};

export type Gameplay = {
  text: string;
  rewards: number;
  options: Option[];
};

export type Option = {
  text: string;
  isAnswer: boolean;
};
