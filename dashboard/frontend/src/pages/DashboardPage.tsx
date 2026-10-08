import {
  Activity,
  BellRing,
  Clock3,
  Droplets,
  Lightbulb,
  ShieldCheck,
  Thermometer,
  TriangleAlert,
} from 'lucide-react'

import SensorCard from '../components/SensorCard'

import { useTriggers } from '../contexts/TriggersContext'
import { mockAlerts } from '../data/mockAlerts'
import { mockDevices } from '../data/mockDevices'

function DashboardPage() {
  const { triggers } = useTriggers()

  const device = mockDevices[0]
  const deviceTriggers = triggers.vintrace001

  const temperatureNormal =
    device.temperature >= deviceTriggers.temperature.min &&
    device.temperature <= deviceTriggers.temperature.max

  const humidityNormal =
    device.humidity >= deviceTriggers.humidity.min &&
    device.humidity <= deviceTriggers.humidity.max

  const luminosityNormal =
    device.luminosity >= deviceTriggers.luminosity.min &&
    device.luminosity <= deviceTriggers.luminosity.max

  const environmentNormal =
    temperatureNormal &&
    humidityNormal &&
    luminosityNormal

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-amber-400">
            VinTrace Guardian
          </p>

          <h1 className="mt-1 text-3xl font-semibold">
            Visão Geral
          </h1>

          <p className="mt-2 text-zinc-400">
            Acompanhe as condições ambientais da sua adega.
          </p>
        </div>

        <div
          className={`flex items-center gap-2 self-start rounded-full border px-3 py-1.5 text-sm ${
            device.online
              ? 'border-emerald-900 bg-emerald-950 text-emerald-400'
              : 'border-zinc-700 bg-zinc-900 text-zinc-400'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              device.online
                ? 'bg-emerald-400'
                : 'bg-zinc-500'
            }`}
          />

          {device.online
            ? 'Dispositivo online'
            : 'Dispositivo offline'}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-400/10 p-3 text-amber-400">
              <Activity size={24} />
            </div>

            <div>
              <h2 className="font-semibold">
                {device.name}
              </h2>

              <p className="text-sm text-zinc-500">
                {device.id} · {device.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Clock3 size={16} />
            Há poucos segundos
          </div>
        </div>
      </div>

      <div
        className={`mt-6 rounded-2xl border p-5 ${
          environmentNormal
            ? 'border-emerald-900 bg-emerald-950/40'
            : 'border-red-900 bg-red-950/40'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`rounded-xl p-2 ${
              environmentNormal
                ? 'bg-emerald-900/50 text-emerald-400'
                : 'bg-red-900/50 text-red-400'
            }`}
          >
            {environmentNormal ? (
              <ShieldCheck size={24} />
            ) : (
              <TriangleAlert size={24} />
            )}
          </div>

          <div>
            <h2
              className={`font-semibold ${
                environmentNormal
                  ? 'text-emerald-400'
                  : 'text-red-400'
              }`}
            >
              {environmentNormal
                ? 'Ambiente estável'
                : 'Anomalia detectada'}
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              {environmentNormal
                ? 'Todos os parâmetros estão dentro das faixas configuradas.'
                : 'Um ou mais parâmetros estão fora dos limites definidos.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SensorCard
          title="Temperatura"
          value={device.temperature}
          unit="°C"
          min={deviceTriggers.temperature.min}
          max={deviceTriggers.temperature.max}
          icon={Thermometer}
        />

        <SensorCard
          title="Umidade"
          value={device.humidity}
          unit="%"
          min={deviceTriggers.humidity.min}
          max={deviceTriggers.humidity.max}
          icon={Droplets}
        />

        <SensorCard
          title="Luminosidade"
          value={device.luminosity}
          unit="%"
          min={deviceTriggers.luminosity.min}
          max={deviceTriggers.luminosity.max}
          icon={Lightbulb}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-3 border-b border-zinc-800 p-5">
          <div className="rounded-xl bg-zinc-800 p-2 text-amber-400">
            <BellRing size={20} />
          </div>

          <div>
            <h2 className="font-semibold">
              Alertas recentes
            </h2>

            <p className="text-sm text-zinc-500">
              Últimas alterações ambientais registradas.
            </p>
          </div>
        </div>

        <div className="divide-y divide-zinc-800">
          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-zinc-200">
                  {alert.sensor}
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  {alert.message}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-sm font-medium text-red-400">
                  {alert.value}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {alert.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage