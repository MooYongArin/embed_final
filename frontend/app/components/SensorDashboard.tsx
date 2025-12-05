import { Wifi, Flame, Smartphone } from 'lucide-react';
import { SensorCard } from './SensorCard';
import { SensorData } from '../page';

interface SensorDashboardProps {
  sensorData: SensorData;
}

export function SensorDashboard({ sensorData }: SensorDashboardProps) {
  return (
    <div className="space-y-4">
      {/* Ultrasonic Sensor */}
      <SensorCard
        title="Ultrasonic Sensor"
        icon={<Wifi className="w-6 h-6" />}
        status={sensorData.ultrasonic.status}
        iconColor="text-blue-400"
      >
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Distance</span>
            <span className="text-white">
              {sensorData.ultrasonic.distance} cm
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Object Detected</span>
            <span
              className={`px-2 py-1 rounded text-xs ${
                sensorData.ultrasonic.objectDetected
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-green-500/20 text-green-400'
              }`}
            >
              {sensorData.ultrasonic.objectDetected ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="mt-2">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  sensorData.ultrasonic.status === 'danger'
                    ? 'bg-red-500'
                    : sensorData.ultrasonic.status === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{
                  width: `${Math.min(
                    (sensorData.ultrasonic.distance / 200) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      </SensorCard>

      {/* Fire Sensor */}
      <SensorCard
        title="Fire Sensor"
        icon={<Flame className="w-6 h-6" />}
        status={sensorData.fire.status}
        iconColor="text-red-400"
      >
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Temperature</span>
            <span className="text-white">
              {sensorData.fire.temperature.toFixed(1)}°C
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Infrared Level</span>
            <span className="text-white">
              {sensorData.fire.infraredLevel.toFixed(0)}%
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <div className="text-xs text-slate-500 mb-1">Temp</div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      ((sensorData.fire.temperature - 15) / 25) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">IR</div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-500"
                  style={{
                    width: `${sensorData.fire.infraredLevel}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </SensorCard>

      {/* Tilt Sensor */}
      <SensorCard
        title="Tilt Sensor"
        icon={<Smartphone className="w-6 h-6" />}
        status={sensorData.tilt.status}
        iconColor="text-purple-400"
      >
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Tilt Angle</span>
            <span className="text-white">
              {sensorData.tilt.angle.toFixed(1)}°
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Stability</span>
            <span
              className={`px-2 py-1 rounded text-xs ${
                sensorData.tilt.isStable
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {sensorData.tilt.isStable ? 'Stable' : 'Unstable'}
            </span>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="relative w-32 h-32">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
              >
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-700"
                />
                {/* Center dot */}
                <circle
                  cx="50"
                  cy="50"
                  r="3"
                  fill="currentColor"
                  className="text-slate-600"
                />
                {/* Tilt indicator */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className={`transition-all duration-500 ${
                    sensorData.tilt.status === 'danger'
                      ? 'text-red-500'
                      : sensorData.tilt.status === 'warning'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                  transform={`rotate(${sensorData.tilt.angle} 50 50)`}
                />
                <circle
                  cx="50"
                  cy="15"
                  r="4"
                  fill="currentColor"
                  className={`transition-all duration-500 ${
                    sensorData.tilt.status === 'danger'
                      ? 'text-red-500'
                      : sensorData.tilt.status === 'warning'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                  transform={`rotate(${sensorData.tilt.angle} 50 50)`}
                />
              </svg>
            </div>
          </div>
        </div>
      </SensorCard>
    </div>
  );
}