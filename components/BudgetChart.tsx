import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { BudgetItem } from '../types';

interface BudgetChartProps {
  data: BudgetItem[];
  activeIndex: number | null;
  onMouseEnter: (entry: any, index: number) => void;
  onMouseLeave: () => void;
  totalAmount: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.amount / totalAmount) * 100).toFixed(1);
    return (
      <div className="bg-white/80 backdrop-blur-sm text-gray-800 p-3 rounded-lg border border-gray-200 shadow-lg">
        <p className="font-bold">{data.category}</p>
        <p>Monto: S/ {data.amount.toFixed(2)}</p>
        <p>Porcentaje: {percentage}%</p>
      </div>
    );
  }
  return null;
};

// This is a workaround because Recharts types for payload are not specific enough
// We capture totalAmount in the closure for the tooltip.
let totalAmount = 0;

export const BudgetChart: React.FC<BudgetChartProps> = ({ data, activeIndex, onMouseEnter, onMouseLeave, totalAmount: propTotalAmount }) => {
  totalAmount = propTotalAmount; // Update the captured totalAmount
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.2"/>
            </filter>
        </defs>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius="55%"
          outerRadius="80%"
          fill="#8884d8"
          dataKey="amount"
          nameKey="category"
          paddingAngle={5}
          cornerRadius={8}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ filter: 'url(#shadow)', cursor: 'pointer' }}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color} 
              stroke={activeIndex === index ? 'white' : entry.color}
              strokeWidth={activeIndex === index ? 3 : 1}
              style={{
                transition: 'all 0.3s ease',
                transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: 'center center'
              }}
            />
          ))}
        </Pie>
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-lg fill-gray-500 font-sans"
        >
          TOTAL
        </text>
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-4xl fill-gray-900 font-bold font-sans"
        >
          S/ {propTotalAmount.toFixed(2)}
        </text>
         <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingBottom: '0px' }}
            formatter={(value, entry) => <span className="text-gray-600 ml-2">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};