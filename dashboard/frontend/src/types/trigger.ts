export interface TriggerRange {
  min: number
  max: number
}

export interface TriggerValues {
  temperature: TriggerRange
  humidity: TriggerRange
  luminosity: TriggerRange
}