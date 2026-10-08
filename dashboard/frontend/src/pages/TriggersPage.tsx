import { useState } from 'react'

import {
  CheckCircle2,
  Droplets,
  Lightbulb,
  Save,
  Thermometer,
  TriangleAlert,
} from 'lucide-react'

import { useTriggers } from '../contexts/TriggersContext'

import type { MonitoringDeviceId } from '../data/mockHistory'
import type { TriggerValues } from '../types/trigger'

function TriggersPage() {
  const [deviceId, setDeviceId] =
    useState<MonitoringDeviceId>('vintrace001')

  const { triggers, updateTriggers } = useTriggers()

  const [form, setForm] = useState<TriggerValues>(
    triggers.vintrace001,
  )

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleDeviceChange(
    newDeviceId: MonitoringDeviceId,
  ) {
    setDeviceId(newDeviceId)
    setForm(triggers[newDeviceId])
    setError('')
    setSuccess('')
  }

  function updateTrigger(
    sensor: keyof TriggerValues,
    field: 'min' | 'max',
    value: number,
  ) {
    setForm((current) => ({
      ...current,

      [sensor]: {
        ...current[sensor],
        [field]: value,
      },
    }))

    setError('')
    setSuccess('')
  }

  function handleSave() {
    const invalidTemperature =
      form.temperature.min >= form.temperature.max

    const invalidHumidity =
      form.humidity.min >= form.humidity.max

    const invalidLuminosity =
      form.luminosity.min >= form.luminosity.max

    if (
      invalidTemperature ||
      invalidHumidity ||
      invalidLuminosity
    ) {
      setSuccess('')

      setError(
        'O limite mínimo precisa ser menor que o limite máximo.',
      )

      return
    }

    updateTriggers(deviceId, form)

    setError('')
    setSuccess('Triggers salvos com sucesso.')
  }

  return (
    <div>
      <div>
        <p className="text-sm font-medium text-amber-400">
          Controle ambiental
        </p>

        <h1 className="mt-1 text-3xl font-semibold">
          Triggers
        </h1>

        <p className="mt-2 text-zinc-400">
          Defina os limites que determinam quando uma condição
          ambiental deve gerar um alerta.
        </p>
      </div>

      <div className="mt-8">
        <label className="text-sm text-zinc-400">
          Dispositivo
        </label>

        <select
          value={deviceId}
          onChange={(event) =>
            handleDeviceChange(
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

      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-900 bg-red-950/40 p-4 text-red-300">
          <TriangleAlert
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p className="text-sm">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-900 bg-emerald-950/40 p-4 text-emerald-300">
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p className="text-sm">
            {success}
          </p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* TEMPERATURA */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-zinc-800 p-3 text-amber-400">
              <Thermometer size={22} />
            </div>

            <div>
              <h2 className="font-semibold">
                Temperatura
              </h2>

              <p className="text-sm text-zinc-500">
                Faixa permitida em °C
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-zinc-400">
                Mínimo
              </label>

              <input
                type="number"
                value={form.temperature.min}
                onChange={(event) =>
                  updateTrigger(
                    'temperature',
                    'min',
                    Number(event.target.value),
                  )
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">
                Máximo
              </label>

              <input
                type="number"
                value={form.temperature.max}
                onChange={(event) =>
                  updateTrigger(
                    'temperature',
                    'max',
                    Number(event.target.value),
                  )
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* UMIDADE */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-zinc-800 p-3 text-amber-400">
              <Droplets size={22} />
            </div>

            <div>
              <h2 className="font-semibold">
                Umidade
              </h2>

              <p className="text-sm text-zinc-500">
                Faixa permitida em %
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-zinc-400">
                Mínimo
              </label>

              <input
                type="number"
                value={form.humidity.min}
                onChange={(event) =>
                  updateTrigger(
                    'humidity',
                    'min',
                    Number(event.target.value),
                  )
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">
                Máximo
              </label>

              <input
                type="number"
                value={form.humidity.max}
                onChange={(event) =>
                  updateTrigger(
                    'humidity',
                    'max',
                    Number(event.target.value),
                  )
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* LUMINOSIDADE */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-zinc-800 p-3 text-amber-400">
              <Lightbulb size={22} />
            </div>

            <div>
              <h2 className="font-semibold">
                Luminosidade
              </h2>

              <p className="text-sm text-zinc-500">
                Faixa permitida em %
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-zinc-400">
                Mínimo
              </label>

              <input
                type="number"
                value={form.luminosity.min}
                onChange={(event) =>
                  updateTrigger(
                    'luminosity',
                    'min',
                    Number(event.target.value),
                  )
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">
                Máximo
              </label>

              <input
                type="number"
                value={form.luminosity.max}
                onChange={(event) =>
                  updateTrigger(
                    'luminosity',
                    'max',
                    Number(event.target.value),
                  )
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm leading-6 text-zinc-400">
          Quando um valor ultrapassar os limites configurados,
          o VinTrace identificará a anomalia e o sistema poderá
          acionar os alertas visuais e sonoros do dispositivo.
        </p>

        <button
          onClick={handleSave}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 font-medium text-zinc-950 transition hover:bg-amber-300 sm:w-auto"
        >
          <Save size={18} />
          Salvar triggers
        </button>
      </div>
    </div>
  )
}

export default TriggersPage