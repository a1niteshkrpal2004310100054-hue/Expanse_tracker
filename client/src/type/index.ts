// For group Slice
export interface Participents {
  createdAt: string;
  inviteToken: string;
  invitedBy: string;
  isRegistered: boolean;
  linkedUserId: string | null;
  name: string;
  updatedAt: string;
  _id: string;
}

export interface GroupItem {
  _id: string;
  title: string;
  createdBy: string;
  participents: Participents[];
  crestedAt: string;
}

export interface PaidBy {
  _id: string;
  name: string;
  email?: string;
}

export interface splitBetween {
  _id: string;
  share: number;
}

export interface Expanse {
  _id: string;
  title: string;
  amount: number;
  paidBy: PaidBy;
  paidByModel: string;
  group: string;
  participents: Participents[];
  splitBetween: splitBetween[];
  isShared: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GroupState {
  groupData: GroupItem[];
  filterGroup: GroupItem[];
  groupExpanse: Expanse[];
  totalAmount?: number;
}

// for Spilit Expanse form

export type Participent = {
  id: string;
  name?: string;
};

export interface SplitForm {
  title: string;
  amount: number;
  paidBy: string;
  participents: Participent[];
  group: string;
  split: Record<string, boolean>;
}

// for single Schema
export interface NormalExpanse {
  createdAt: string | number | Date;
  _id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  paymentMethod: string;
}

export interface NormalExpanseState {
  expenses: NormalExpanse[];
}

// for chart
export interface Data {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface SIngleInputs {
  title: string;
  amount: number | null;
  category: string;
  description: string;
  paymentMethod: string;
}

export type SingleExpenseProps = {
  name: string;
  mode: "create" | "edit";
  expense?: Partial<SIngleInputs> & { _id?: string | undefined };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

// for Table

export interface Table {
  _id?: string;
  title: string;
  amount: number;
  totalAmount?: string;
  category: string;
  description?: string;
  paymentMethod?: string;
  createdBy?: string;
  createdAt?: string | number | Date;
  updatedA?: string;
}

export type childHandle = {
  getSelectedIds: () => number;
};

// for Generate Monthly data
export type MonthlyGroupItem = {
  getMonth: string;
  category: string;
  totalAmount: number;
};

export type MonthlyGroup = {
  [key: string]: MonthlyGroupItem;
};
