import {
  useState,
  type ReactNode,
} from 'react'

import { mockTriggers } from '../data/mockTriggers'

import type { MonitoringDeviceId } from '../data/mockHistory'
import type { TriggerValues } from '../types/trigger'

import { TriggersContext } from './TriggersContext'

interface TriggersProviderProps {
  children: ReactNode
}

function TriggersProvider({
  children,
}: TriggersProviderProps) {
  const [triggers, setTriggers] =
    useState<Record<MonitoringDeviceId, TriggerValues>>(
      mockTriggers,
    )

  function updateTriggers(
    deviceId: MonitoringDeviceId,
    values: TriggerValues,
  ) {
    setTriggers((current) => ({
      ...current,
      [deviceId]: values,
    }))
  }

  return (
    <TriggersContext.Provider
      value={{
        triggers,
        updateTriggers,
      }}
    >
      {children}
    </TriggersContext.Provider>
  )
}

export default TriggersProvider