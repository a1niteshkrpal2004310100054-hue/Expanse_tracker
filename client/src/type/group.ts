export type Routeparams = {
  groupId: string;
};

export type PaidBy = {
  _id: string;
  name: string;
};

export type Participents = {
  name: string;
  id: string | null;
  linkedUserId?: string;
};

export type ViewInput = {
  title: string;
  amount: number;
  totalAmount: number;
  paidBy: PaidBy;
  participents: Participents[];
};
