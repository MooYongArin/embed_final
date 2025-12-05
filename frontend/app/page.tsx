"use client"
import { useState, useEffect } from 'react';
import { SensorDashboard } from './components/SensorDashboard';
import { AlertPanel } from './components/AlertPanel';
import { SensorHistory } from './components/SensorHistory';

export interface SensorData {
  ultrasonic: {
    distance: number;
    objectDetected: boolean;
    status: 'safe' | 'warning' | 'danger';
  };
  fire: {
    temperature: number;
    infraredLevel: number;
    status: 'safe' | 'warning' | 'danger';
  };
  tilt: {
    angle: number;
    isStable: boolean;
    status: 'safe' | 'warning' | 'danger';
  };
  timestamp: Date;
}

export default function App() {
  const [sensorData, setSensorData] = useState<SensorData>({
    ultrasonic: { distance: 100, objectDetected: false, status: 'safe' },
    fire: { temperature: 22, infraredLevel: 0, status: 'safe' },
    tilt: { angle: 0, isStable: true, status: 'safe' },
    timestamp: new Date(),
  });

  const [alerts, setAlerts] = useState<Array<{
    id: string;
    type: 'ultrasonic' | 'fire' | 'tilt';
    message: string;
    severity: 'warning' | 'danger';
    timestamp: Date;
  }>>([]);

  const [history, setHistory] = useState<SensorData[]>([]);

  // Simulate real-time sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData: SensorData = {
        ultrasonic: {
          distance: Math.floor(Math.random() * 200),
          objectDetected: Math.random() > 0.7,
          status: 'safe',
        },
        fire: {
          temperature: 20 + Math.random() * 15,
          infraredLevel: Math.random() * 100,
          status: 'safe',
        },
        tilt: {
          angle: (Math.random() - 0.5) * 30,
          isStable: true,
          status: 'safe',
        },
        timestamp: new Date(),
      };

      // Determine status for ultrasonic sensor
      if (newData.ultrasonic.distance < 20) {
        newData.ultrasonic.status = 'danger';
        newData.ultrasonic.objectDetected = true;
      } else if (newData.ultrasonic.distance < 50) {
        newData.ultrasonic.status = 'warning';
        newData.ultrasonic.objectDetected = true;
      }

      // Determine status for fire sensor
      if (newData.fire.temperature > 30 || newData.fire.infraredLevel > 60) {
        newData.fire.status = 'danger';
      } else if (newData.fire.temperature > 27 || newData.fire.infraredLevel > 30) {
        newData.fire.status = 'warning';
      }

      // Determine status for tilt sensor
      if (Math.abs(newData.tilt.angle) > 15) {
        newData.tilt.status = 'danger';
        newData.tilt.isStable = false;
      } else if (Math.abs(newData.tilt.angle) > 8) {
        newData.tilt.status = 'warning';
        newData.tilt.isStable = false;
      }

      // Generate alerts for dangerous conditions
      const newAlerts: {
        id: string;
        type: 'ultrasonic' | 'fire' | 'tilt';
        message: string;
        severity: 'warning' | 'danger';
        timestamp: Date;
      }[] = [];
      if (newData.ultrasonic.status === 'danger') {
        newAlerts.push({
          id: `alert-${Date.now()}-ultrasonic`,
          type: 'ultrasonic' as const,
          message: `Object detected at ${newData.ultrasonic.distance}cm - Too close!`,
          severity: 'danger' as const,
          timestamp: new Date(),
        });
      }

      if (newData.fire.status === 'danger') {
        newAlerts.push({
          id: `alert-${Date.now()}-fire`,
          type: 'fire' as const,
          message: `Fire alert! Temperature: ${newData.fire.temperature.toFixed(1)}°C, Infrared: ${newData.fire.infraredLevel.toFixed(0)}%`,
          severity: 'danger' as const,
          timestamp: new Date(),
        });
      }

      if (newData.tilt.status === 'danger') {
        newAlerts.push({
          id: `alert-${Date.now()}-tilt`,
          type: 'tilt' as const,
          message: `Critical tilt detected: ${newData.tilt.angle.toFixed(1)}° - Structure unstable!`,
          severity: 'danger' as const,
          timestamp: new Date(),
        });
      }

      if (newAlerts.length > 0) {
        setAlerts((prev) => [...newAlerts, ...prev].slice(0, 10));
      }

      setSensorData(newData);
      setHistory((prev) => [...prev, newData].slice(-20));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-md mx-auto lg:max-w-6xl">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
          <div className="px-4 py-4">
            <h1 className="text-white flex items-center gap-2">
              <span className="text-2xl">🏠</span>
              Home Safety Monitor
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time IoT sensor monitoring
            </p>
          </div>
        </div>

        {/* Alert Panel */}
        {alerts.length > 0 && (
          <AlertPanel alerts={alerts} onClearAlerts={clearAlerts} />
        )}

        {/* Main Content */}
        <div className="p-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:p-6">
          {/* Sensor Dashboard */}
          <div className="lg:col-span-2">
            <SensorDashboard sensorData={sensorData} />
          </div>

          {/* Sensor History */}
          <div className="mt-4 lg:mt-0">
            <SensorHistory history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}