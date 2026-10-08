import { useState } from 'react'

import {
  Droplets,
  Lightbulb,
  Thermometer,
} from 'lucide-react'

import HistoryChart from '../components/HistoryChart'

import {
  mockMonitoringData,
  type HistoryPeriod,
  type MonitoringDeviceId,
} from '../data/mockHistory'

function MonitoringPage() {
  const [period, setPeriod] = useState<HistoryPeriod>('24h')
  const [deviceId, setDeviceId] =
    useState<MonitoringDeviceId>('vintrace001')

  const device = mockMonitoringData[deviceId]
  const history = device.history[period]

  const temperatureNormal =
    device.current.temperature >= 10 &&
    device.current.temperature <= 18

  const humidityNormal =
    device.current.humidity >= 60 &&
    device.current.humidity <= 80

  const luminosityNormal =
    device.current.luminosity >= 0 &&
    device.current.luminosity <= 20

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
            setDeviceId(event.target.value as MonitoringDeviceId)
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
                setPeriod(option.value as HistoryPeriod)
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
        {/* TEMPERATURA */}
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
                {device.current.temperature} °C
              </p>

              <p
                className={`mt-1 text-xs ${
                  temperatureNormal
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }`}
              >
                {temperatureNormal ? 'Normal' : 'Alerta'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <HistoryChart
              data={history.temperature}
              min={10}
              max={18}
              unit="°C"
              label="Temperatura"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-emerald-500" />
              Limite mínimo: 10 °C
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-red-500" />
              Limite máximo: 18 °C
            </div>
          </div>
        </div>

        {/* UMIDADE */}
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
                {device.current.humidity}%
              </p>

              <p
                className={`mt-1 text-xs ${
                  humidityNormal
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }`}
              >
                {humidityNormal ? 'Normal' : 'Alerta'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <HistoryChart
              data={history.humidity}
              min={60}
              max={80}
              unit="%"
              label="Umidade"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-emerald-500" />
              Limite mínimo: 60%
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-red-500" />
              Limite máximo: 80%
            </div>
          </div>
        </div>

        {/* LUMINOSIDADE */}
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
                {device.current.luminosity}%
              </p>

              <p
                className={`mt-1 text-xs ${
                  luminosityNormal
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }`}
              >
                {luminosityNormal ? 'Normal' : 'Alerta'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <HistoryChart
              data={history.luminosity}
              min={0}
              max={20}
              unit="%"
              label="Luminosidade"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-emerald-500" />
              Limite mínimo: 0%
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-full bg-red-500" />
              Limite máximo: 20%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonitoringPage