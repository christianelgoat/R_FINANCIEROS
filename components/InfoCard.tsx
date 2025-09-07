import React from 'react';
import type { BudgetItem } from '../types';

interface InfoCardProps {
  item: BudgetItem | null;
  total: number;
}

export const InfoCard: React.FC<InfoCardProps> = ({ item, total }) => {
  if (!item) {
    return (
      <div className="w-full max-w-md h-80 flex flex-col items-center justify-center text-center bg-gray-50 rounded-xl p-8 border border-gray-200 transition-all duration-300">
        <h3 className="text-xl font-semibold text-gray-700">Seleccione una categoría</h3>
        <p className="text-gray-500 mt-2">Pase el cursor sobre el gráfico para ver los detalles de cada partida del presupuesto.</p>
      </div>
    );
  }

  const percentage = total > 0 ? ((item.amount / total) * 100).toFixed(1) : 0;

  return (
    <div className="w-full max-w-md h-auto lg:h-80 flex flex-col bg-white rounded-xl p-8 border border-gray-200 shadow-lg transition-all duration-500 ease-in-out">
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full mr-4" style={{ backgroundColor: `${item.color}20` }}>
           <item.icon className="w-8 h-8" style={{ color: item.color }} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{item.category}</h2>
          <div className="flex items-baseline space-x-2 text-gray-600">
            <span className="text-3xl font-bold" style={{ color: item.color }}>S/ {item.amount.toFixed(2)}</span>
            <span className="text-lg font-medium">({percentage}%)</span>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <p className="text-gray-600 leading-relaxed">
          {item.description}
        </p>
      </div>
       <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div className="h-2.5 rounded-full" style={{ width: `${percentage}%`, backgroundColor: item.color, transition: 'width 0.5s ease-in-out' }}></div>
        </div>
    </div>
  );
};