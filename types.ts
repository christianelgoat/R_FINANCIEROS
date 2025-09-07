
import type React from 'react';

export interface BudgetItem {
  category: string;
  amount: number;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
}
