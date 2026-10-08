import { useState } from 'react'

import {
  Droplets,
  Lightbulb,
  Thermometer,
} from 'lucide-react'

import HistoryChart from '../components/HistoryChart'

import { useTriggers } from '../contexts/TriggersContext'
import { mockDevices } from '../data/mockDevices'

import {
  mockMonitoringData,
  type HistoryPeriod,
  type MonitoringDeviceId,
} from '../data/mockHistory'

function MonitoringPage() {
  const [period, setPeriod] = useState<HistoryPeriod>('24h')

  const [deviceId, setDeviceId] =
    useState<MonitoringDeviceId>('vintrace001')

  const { triggers } = useTriggers()

  const monitoringDevice = mockMonitoringData[deviceId]
  const history = monitoringDevice.history[period]

  const device = mockDevices.find(
    (item) => item.id === deviceId,
  )!

  const deviceTriggers = triggers[deviceId]

  const temperatureNormal =
    device.temperature >= deviceTriggers.temperature.min &&
    device.temperature <= deviceTriggers.temperature.max

  const humidityNormal =
    device.humidity >= deviceTriggers.humidity.min &&
    device.humidity <= deviceTriggers.humidity.max

  const luminosityNormal =
    device.luminosity >= deviceTriggers.luminosity.min &&
    device.luminosity <= deviceTriggers.luminosity.max

  return (
    <div>
      <div>
        <p className="text-sm font-medium text-amber-400">
          Dados ambientais
        </p>

        <h1 className="mt-1 text-3xl font-semibold">
          Monitoramento
        </h1>

        <p className="mt-2 text-zinc-400">
          Acompanhe os dados atuais e o histórico dos sensores.
        </p>
      </div>

      <div className="mt-8">
        <label className="text-sm text-zinc-400">
          Dispositivo
        </label>

        <select
          value={deviceId}
          onChange={(event) =>
            setDeviceId(
              event.target.value as MonitoringDeviceId,
            )
          }
          className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm outline-none transition focus:border-amber-400 sm:max-w-sm"
        >
          <option value="vintrace001">
            Adega Principal — vintrace001
          </option>

          <option value="vintrace002">
            Adega Reserva — vintrace002
          </option>
        </select>
      </div>

      <div className="mt-6">
        <p className="text-sm text-zinc-400">
          Período
        </p>

        <div className="mt-2 flex w-full gap-2 sm:w-auto">
          {[
            { value: '24h', label: '24 horas' },
            { value: '7d', label: '7 dias' },
            { value: '30d', label: '30 dias' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setPeriod(
                  option.value as HistoryPeriod,
                )
              }
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition sm:flex-none ${
                period === option.value
                  ? 'bg-amber-400 text-zinc-950'
                  : 'border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-zinc-800 p-3 text-amber-400">
                <Thermometer size={22} />
              </div>

              <div>
                <h2 className="font-semibold">
                  Temperatura
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Histórico do período selecionado
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-semibold">
                {device.temperature} °C
              </p>

              <p
                className={`mt-1 text-xs ${
                  temperatureNormal
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }`}
              >
                {temperatureNormal
                  ? 'Normal'
                  : 'Alerta'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <HistoryChart
              data={history.temperature}
              min={deviceTriggers.temperature.min}
              max={deviceTriggers.temperature.max}
              unit="°C"
              label="Temperatura"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-emerald-500" />

              Limite mínimo:{' '}
              {deviceTriggers.temperature.min} °C
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-red-500" />

              Limite máximo:{' '}
              {deviceTriggers.temperature.max} °C
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-zinc-800 p-3 text-amber-400">
                <Droplets size={22} />
              </div>

              <div>
                <h2 className="font-semibold">
                  Umidade
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Histórico do período selecionado
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-semibold">
                {device.humidity}%
              </p>

              <p
                className={`mt-1 text-xs ${
                  humidityNormal
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }`}
              >
                {humidityNormal
                  ? 'Normal'
                  : 'Alerta'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <HistoryChart
              data={history.humidity}
              min={deviceTriggers.humidity.min}
              max={deviceTriggers.humidity.max}
              unit="%"
              label="Umidade"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-emerald-500" />

              Limite mínimo:{' '}
              {deviceTriggers.humidity.min}%
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-red-500" />

              Limite máximo:{' '}
              {deviceTriggers.humidity.max}%
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-zinc-800 p-3 text-amber-400">
                <Lightbulb size={22} />
              </div>

              <div>
                <h2 className="font-semibold">
                  Luminosidade
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Histórico do período selecionado
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-semibold">
                {device.luminosity}%
              </p>

              <p
                className={`mt-1 text-xs ${
                  luminosityNormal
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }`}
              >
                {luminosityNormal
                  ? 'Normal'
                  : 'Alerta'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <HistoryChart
              data={history.luminosity}
              min={deviceTriggers.luminosity.min}
              max={deviceTriggers.luminosity.max}
              unit="%"
              label="Luminosidade"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-emerald-500" />

              Limite mínimo:{' '}
              {deviceTriggers.luminosity.min}%
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-red-500" />

              Limite máximo:{' '}
              {deviceTriggers.luminosity.max}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonitoringPage