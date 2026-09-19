import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const ThreatChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const labels = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:10'];

  const data = {
    labels,
    datasets: [
      {
        label: '拦截威胁 (Blocked)',
        data: [42, 68, 55, 120, 89, 74, 142, 198, 164, 185],
        borderColor: isDark ? '#FF453A' : '#FF3B30',
        backgroundColor: isDark ? 'rgba(255, 69, 58, 0.08)' : 'rgba(255, 59, 48, 0.06)',
        borderWidth: 1.8,
        tension: 0.35,
        fill: true,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: isDark ? '#FF453A' : '#FF3B30',
      },
      {
        label: '正常监控请求 (Traffic)',
        data: [210, 240, 290, 340, 310, 280, 420, 490, 450, 480],
        borderColor: isDark ? '#0A84FF' : '#007AFF',
        backgroundColor: isDark ? 'rgba(10, 132, 255, 0.06)' : 'rgba(0, 122, 255, 0.04)',
        borderWidth: 1.5,
        tension: 0.35,
        fill: true,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: isDark ? '#0A84FF' : '#007AFF',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark ? '#FFFFFF' : '#1D1D1F',
        bodyColor: isDark ? '#E5E5EA' : '#48484A',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        cornerRadius: 8,
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 12, family: 'ui-monospace' },
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
          font: { size: 11, family: 'ui-monospace' },
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
          font: { size: 11, family: 'ui-monospace' },
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <Card variant="surface" padding="md" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-2 gap-2 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-card-title text-text-primary text-[15px]">实时威胁活动与流量趋势</h3>
            <Badge variant="accent" size="sm">Realtime</Badge>
          </div>
          <p className="font-caption text-text-secondary mt-0.5">
            内核级 eBPF 过滤监控与网络数据包态势
          </p>
        </div>

        {/* Legend Indicators */}
        <div className="flex items-center gap-4 text-[12px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-semantic-danger shrink-0" />
            <span className="text-text-secondary">拦截威胁</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
            <span className="text-text-secondary">正常流量</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Container */}
      <div className="h-60 sm:h-64 w-full pt-1">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};
