import React, { useState, useMemo } from 'react';
import type { BudgetItem } from './types';
import { BudgetChart } from './components/BudgetChart';
import { InfoCard } from './components/InfoCard';
import { DomainIcon, LogisticsIcon, ServicesIcon, ContingencyIcon } from './components/Icons';

const budgetData: BudgetItem[] = [
  { 
    category: 'Dominio y Hosting', 
    amount: 100.00, 
    description: 'Adquisición de un dominio web (.com, .pe) y/o costos asociados a un plan de hosting básico si las capas gratuitas no fueran suficientes.',
    icon: (props) => <DomainIcon {...props} />,
    color: '#38bdf8' // sky-400
  },
  { 
    category: 'Viáticos y Logística', 
    amount: 150.00, 
    description: 'Gastos de transporte para las visitas y reuniones con las MYPES participantes durante la fase de pruebas piloto.',
    icon: (props) => <LogisticsIcon {...props} />,
    color: '#34d399' // emerald-400
  },
  { 
    category: 'Suscripciones a Servicios/APIs', 
    amount: 50.00, 
    description: 'Posibles costos de APIs de terceros o suscripciones temporales a herramientas que puedan acelerar el desarrollo.',
    icon: (props) => <ServicesIcon {...props} />,
    color: '#f87171' // red-400
  },
  { 
    category: 'Fondo de Contingencia', 
    amount: 100.00, 
    description: 'Reserva para cubrir gastos imprevistos que puedan surgir durante la ejecución del proyecto.',
    icon: (props) => <ContingencyIcon {...props} />,
    color: '#fbbf24' // amber-400
  }
];

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const totalAmount = useMemo(() => 
    budgetData.reduce((sum, item) => sum + item.amount, 0),
    []
  );

  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const handleMouseLeave = () => {
    // Optionally keep the last active index visible
    // setActiveIndex(null);
  };

  const activeItem = activeIndex !== null ? budgetData[activeIndex] : null;

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          Desglose de Presupuesto del Proyecto
        </h1>
        
      </header>
      
      <main className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="w-full lg:w-1/2 h-80 sm:h-96 lg:h-[450px]">
          <BudgetChart 
            data={budgetData} 
            activeIndex={activeIndex}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            totalAmount={totalAmount}
          />
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <InfoCard item={activeItem} total={totalAmount} />
        </div>
      </main>

      <footer className="mt-8 text-gray-500 text-sm">
      </footer>
    </div>
  );
};

export default App;
