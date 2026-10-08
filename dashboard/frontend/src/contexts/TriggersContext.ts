import {
  createContext,
  useContext,
} from 'react'

import type { MonitoringDeviceId } from '../data/mockHistory'
import type { TriggerValues } from '../types/trigger'

export interface TriggersContextType {
  triggers: Record<MonitoringDeviceId, TriggerValues>

  updateTriggers: (
    deviceId: MonitoringDeviceId,
    values: TriggerValues,
  ) => void
}

export const TriggersContext =
  createContext<TriggersContextType | undefined>(undefined)

export function useTriggers() {
  const context = useContext(TriggersContext)

  if (!context) {
    throw new Error(
      'useTriggers deve ser usado dentro de TriggersProvider',
    )
  }

  return context
}